import { isVariable } from "./syntatic.js"

const varRegex = new RegExp('\\bvar\\b')
const beginRegex = new RegExp('\\bbegin\\b')
const endRegex = new RegExp('\\bend\\b')
const ifRegex = new RegExp('\\bif\\b')
const forRegex = new RegExp('\\bfor\\b')

export const semantic = (code, variables) => {
  const semanticErrors = getSemanticErrors(code, variables)

  return {
    semanticAnalysis: semanticErrors
  }
}

function getSemanticErrors(code, variables) {
  let errors = []

  const tokensErrors = getTokenErrors(code, variables)

  if (tokensErrors.length) {
    errors = errors.concat(tokensErrors)
  }

  const variablesDeclaredOnlyOnceErrors = getVariablesDeclaredOnlyOnceErrors(variables)

  if (variablesDeclaredOnlyOnceErrors.length) {
    errors = errors.concat(variablesDeclaredOnlyOnceErrors)
  }

  return errors
}

function getTokenErrors(code, variables) {
  const errors = []

  let varTokenCount = 0
  let beginTokenCount = 0
  let endTokenCount = 0

  const codeSectionLines = code.split('\n')

  for (let i = 0; i < codeSectionLines.length; i++) {
    const codeLine = codeSectionLines[i]

    if (varRegex.test(codeLine)) {
      varTokenCount++
    }

    if (beginRegex.test(codeLine)) {
      beginTokenCount++
    }

    if (endRegex.test(codeLine)) {
      endTokenCount++
    }

    if (codeLine.indexOf(' = ') >= 0) {
      if (!ifRegex.test(codeLine) && !forRegex.test(codeLine)) {

        const splited = codeLine.trim().split(' ')

        const leftSide = splited[0]
        const rightSide = splited[2]

        const leftSideType = getVariableOrConstantType(leftSide, variables)
        const rightSideType = getVariableOrConstantType(rightSide, variables)

        if (leftSideType.toLowerCase().trim() !== rightSideType.toLowerCase().trim()) {
          errors.push({
            error: `Variável do tipo "${leftSideType}" não pode receber valor ou variável do tipo "${rightSideType}"`
          })
        }

        if (leftSideType.toLowerCase().trim() === "string") {
          const fullStringType = variables.find(v => v.name.toLowerCase().trim() === leftSide.toLowerCase().trim()).fullType.toLowerCase().trim()

          const stringSize = fullStringType.slice(7, fullStringType.indexOf(")"))

          let rightValueSize = 0

          // verifies if right side is variable
          if (rightSideType.toLowerCase().trim() === "string") {
            const fullRightSideStringType = variables.find(v => v.name.toLowerCase().trim() === rightSide.toLowerCase().trim())?.fullType.toLowerCase().trim()

            rightValueSize = fullRightSideStringType?.slice(7, fullRightSideStringType.indexOf(")"))
          }

          if (!rightValueSize) {
            rightValueSize = rightSide.slice(1, rightSide.length - 1).length
          }

          if (stringSize < rightValueSize) {
            errors.push({
              error: `Variável "${leftSide}" não pode receber valor ou variável de tamanho maior do que ${stringSize}`
            })
          }
        }
      }
    }
  }

  if (varTokenCount != 1) {
    errors.push({
      error: 'Obrigatório apenas um token "var" no início da seção de variáveis do código'
    })
  }

  if (beginTokenCount != 1) {
    errors.push({
      error: 'Obrigatório apenas um token "begin" no início do código'
    })
  }

  if (endTokenCount != 1) {
    errors.push({
      error: 'Obrigatório apenas um token "end" no final do código'
    })
  }

  return errors
}

function getVariableOrConstantType(variableOrConstant, variables) {
  const variableTrim = variableOrConstant.trim()

  let variableType = variables.find(v => v.name === variableTrim)?.type

  if (variableType) return variableType

  if (!isNaN(variableTrim)) {
    if (Number.isInteger(Number(variableTrim))) {
      return "int"
    }

    return "float"
  }

  if (variableTrim.toLowerCase() === "true" || variableTrim.toLowerCase() === "false") {
    return "boolean"
  }

  if (variableTrim.length > 0) {
    return "string"
  }
}

function getVariablesDeclaredOnlyOnceErrors(variables) {
  const errors = []

  const namesArr = variables.map(function (item) { return item.name });

  const duplicates = namesArr.filter(function (item, idx) {
    return namesArr.indexOf(item) != idx
  });

  duplicates.forEach(d => {
    errors.push({
      error: `Variável "${d}" foi declarada mais de uma vez`
    })
  })

  return errors
}

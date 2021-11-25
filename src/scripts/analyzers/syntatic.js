import { isComparisonOperator, isNumber, isValidType, isWhitespace } from "../../helpers/identify.js"

const endifRegex = new RegExp('\\bendif\\b')
const ifRegex = new RegExp('\\bif\\b')
const forRegex = new RegExp('\\bfor\\b')
const endForRegex = new RegExp('\\bendfor\\b')

export const syntatic = (code) => {
  const variableDeclarationValues = getVariableDeclarationValues(code)

  const codeErrors = getCodeErrors(code, variableDeclarationValues.variables)

  return {
    variableDeclarationAnalysis: variableDeclarationValues,
    codeAnalysis: codeErrors
  }
}

function getVariableDeclarationValues(code) {
  const errors = []
  const variables = []

  const lastIndex = code.indexOf('begin');

  const variableDeclarationSectionLines = code.substring(0, lastIndex).split('\n')

  for (let i = 0; i < variableDeclarationSectionLines.length; i++) {
    const declarations = variableDeclarationSectionLines[i]

    if (i === 0 && declarations.trim().toLowerCase() !== 'var') {
      errors.push({
        line: i + 1,
        error: 'Obrigatório existir o token "var" no início da seção de variáveis'
      })
      continue;
    }

    if (i === 0) continue;

    if (isWhitespace(declarations)) {
      continue;
    }

    const variableDeclaration = declarations.split(':')

    if (!(variableDeclaration.length === 2)) {
      errors.push({
        line: i + 1,
        error: 'Variável não está declarada corretamente'
      })

      continue
    }

    const variableName = variableDeclaration[0].trim()
    const variableType = variableDeclaration[1].trim().split('(')[0]

    const fullType = variableDeclaration[1]

    if (isWhitespace(variableName)) {
      errors.push({
        line: i + 1,
        error: 'Variável não está declarada corretamente'
      })

      continue
    }

    if (!isValidType(variableType)) {
      errors.push({
        line: i + 1,
        error: `Tipo de variável "${variableType}" é inválido`
      })

      continue
    }

    variables.push({
      name: variableName,
      type: variableType,
      fullType
    })
  }

  return {
    errors,
    variables
  }
}

function getCodeErrors(code, variables) {
  let errors = []

  let ifsFounded = 0
  let endIfsFounded = 0
  let forsFounded = 0
  let endForsFounded = 0

  const firstIndex = code.indexOf('begin');
  const endToken = code.substring(code.length - 'end'.length, code.length)

  if (firstIndex === -1) {
    errors.push({
      line: '',
      error: 'Obrigatório existir o token "begin" no início do código'
    })
  }

  if (endToken.trim().toLowerCase() !== 'end') {
    errors.push({
      line: '',
      error: 'Obrigatório existir o token "end" no final do código'
    })
  }

  const codeSectionLines = code.substring(firstIndex, code.length).split('\n')

  // line by line
  for (let i = 0; i < codeSectionLines.length; i++) {
    const codeLine = codeSectionLines[i]
    const codeLineIndex = variables.length + i + 2

    if (i === 0 && codeLine.trim().toLowerCase() !== 'begin') {
      errors.push({
        line: codeLineIndex,
        error: 'Obrigatório existir o token "begin" no início do código'
      })
      continue;
    }

    if (ifRegex.test(codeLine)) {
      const ifValidationErrors = validateIf(codeLine, variables)

      if (ifValidationErrors.length) {
        errors = errors.concat(ifValidationErrors)
      }

      const endIfValidationErrors = searchEndIf(codeSectionLines, i)

      if (endIfValidationErrors.length) {
        errors = errors.concat(endIfValidationErrors)
      }

      ifsFounded++
    }


    if (endifRegex.test(codeLine)) {
      endIfsFounded++
    }

    if (forRegex.test(codeLine)) {
      forsFounded++

      const forOperator = codeLine.trim().split(' ')

      try {
        const variable1 = forOperator[1]
        const attributionOperator1 = forOperator[2]
        const constant1 = forOperator[3]
        const toOperator = forOperator[4]
        const constant2 = forOperator[5]
        const doOperator = forOperator[6]

        if (!isVariable(variable1, variables)) {
          errors.push({
            line: 0,
            error: 'Variável de atrubuição do "for" é inválida'
          })
        }

        if (attributionOperator1.trim() != '=') {
          errors.push({
            line: 0,
            error: 'Operador de atribuição não encontrado no laço "for"'
          })
        }

        if (!isNumber(constant1)) {
          errors.push({
            line: 0,
            error: 'Primeira constante não encontrada no laço "for"'
          })
        }

        if (toOperator.trim().toLowerCase() != 'to') {
          errors.push({
            line: 0,
            error: 'Token "to" não encontrado no laço "for"'
          })
        }

        if (!isNumber(constant2)) {
          errors.push({
            line: 0,
            error: 'Segunda constante não encontrada no laço "for"'
          })
        }

        if (doOperator.trim().toLowerCase() != 'do') {
          errors.push({
            line: 0,
            error: 'Token "do" não encontrado no laço "for"'
          })
        }
      } catch (e) {
        errors.push({
          line: 0,
          error: 'Erro ao analisar o laço "for"'
        })
      }
    }

    if (endForRegex.test(codeLine)) {
      endForsFounded++
    }

    if (codeLine.trim().toLowerCase().indexOf('write(') >= 0) {
      const writeCommand = codeLine.split('(')[1]

      if (writeCommand.trim().toLowerCase().indexOf(')') < 0) {
        errors.push({
          line: 0,
          error: 'Comando write deve ser finalizado com ")"'
        })
      }

      const stringOrVariable = writeCommand.trim().toLowerCase().substr(0, writeCommand.length - 1)

      let isValid = false

      try {
        if (!!eval(stringOrVariable)) {
          isValid = true
        }
      } catch (e) { }

      if (isVariable(stringOrVariable, variables)) {
        isValid = true
      }

      if (!isValid) {
        errors.push({
          line: 0,
          error: `É necessário que seja informado uma variável, string ou número dentro do write - token "${stringOrVariable}" inválido`
        })
      }
    }

    if (codeLine.trim().toLowerCase().indexOf('read(') >= 0) {
      const writeCommand = codeLine.split('(')[1]

      if (writeCommand.trim().toLowerCase().indexOf(')') < 0) {
        errors.push({
          line: 0,
          error: 'Comando read deve ser finalizado com ")"'
        })
      }

      const writeVariable = writeCommand.trim().toLowerCase().substr(0, writeCommand.length - 1)

      if (!isVariable(writeVariable, variables)) {
        errors.push({
          line: 0,
          error: `É necessário que seja informado uma variável dentro do read - token "${writeVariable}" inválido`
        })
      }
    }

    if (codeLine.indexOf(' = ') >= 0) {
      if (!ifRegex.test(codeLine) && !forRegex.test(codeLine)) {

        const ifSplited = codeLine.trim().split(' ')

        const leftSideIf = ifSplited[0]
        const rightSideIf = ifSplited[2]

        if (!isVariable(leftSideIf, variables)) {
          errors.push({
            line: 0,
            error: `É necessário que seja informado uma variável a esquerda de um operador de atribuição - token "${leftSideIf}" inválido`
          })
        }

        if (!isVariable(rightSideIf, variables)) {
          try {
            eval(rightSideIf)
          } catch (e) {
            errors.push({
              line: 0,
              error: `É necessário que seja informado uma variável, string ou número a direita de um operador de atribuição - token "${rightSideIf}" inválido`
            })
          }
        }
      }
    }
  }

  if (ifsFounded > endIfsFounded) {
    errors.push({
      line: 0,
      error: 'É necessário que exista um "endif" no final de um "if"'
    })
  }

  if (forsFounded > endForsFounded) {
    errors.push({
      line: 0,
      error: 'É necessário que exista um "endfor" no final de um "for"'
    })
  }

  return errors
}

function validateIf(codeLine, variables) {
  let errors = []

  const ifOperator = codeLine.trim().split(' ')

  const variableOrConstant1 = ifOperator[1]
  const comparisonOperator = ifOperator[2]
  const variableOrConstant2 = ifOperator[3]

  if (!verifyVariableOrConstant(variableOrConstant1, variables)) {
    errors.push({
      line: 0,
      error: `Elemento a esquerda do if deve ser uma variável declarada ou constante - token "${variableOrConstant1}" inválido`
    })
  }

  if (!isComparisonOperator(comparisonOperator)) {
    errors.push({
      line: 0,
      error: `Elemento do meio do if deve ser um operador de comparação - token "${comparisonOperator}" inválido`
    })
  }

  if (!verifyVariableOrConstant(variableOrConstant2, variables)) {
    errors.push({
      line: 0,
      error: `Elemento a direita do if deve ser uma variável declarada ou constante - token "${variableOrConstant2}" inválido`
    })
  }

  return errors
}

export function isVariable(varialbeToVerify, variables) {
  let returningValue = false

  variables.forEach((variable) => {
    if (variable.name.trim().toLowerCase() === varialbeToVerify.trim().toLowerCase()) {
      returningValue = true
    }
  })

  return returningValue
}

function verifyVariableOrConstant(variableOrConstant, variables) {
  let returningValue = false

  if (isNumber(variableOrConstant)) {
    return true
  }

  variables.forEach((variable) => {
    if (variable.name.trim().toLowerCase() === variableOrConstant.trim().toLowerCase()) {
      returningValue = true
    }
  })

  return returningValue
}

function searchEndIf(codeLines, startingIndex) {
  let errors = []
  let endIfsFounded = 0
  let edIfsSearched = 1
  startingIndex = startingIndex + 1

  for (let i = startingIndex; i < codeLines.length; i++) {
    const codeLine = codeLines[i].trim()

    if (ifRegex.test(codeLine)) {
      const ifValidationErrors = validateIf(codeLine)

      errors.concat(ifValidationErrors)

      edIfsSearched += 1

      const endIfValidationErrors = searchEndIf(codeLines, i)

      if (endIfValidationErrors.length === 0) endIfsFounded += 1

      errors.concat(endIfValidationErrors)
    }

    if (endifRegex.test(codeLine)) {
      endIfsFounded += 1
      break
    }
  }

  if (endIfsFounded !== edIfsSearched) {
    errors.push({
      line: 0,
      error: 'É necessário que exista um "endif" no final de um "if"'
    })
  }

  return errors
}
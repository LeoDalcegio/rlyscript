const acceptedTokens = [
  // acceptedIndicators
  { value: 'Begin', description: 'Indicador de início de código' },
  { value: 'End', description: 'Indicador de fim de código' },
  { value: 'Var', description: 'Indicador de início da sessão de declaração de variáveis' },

  // acceptedSymbols
  { value: ',', description: 'Símbolo ","' },
  { value: '(', description: 'Símbolo "("' },
  { value: '[', description: 'Símbolo "["' },
  { value: ']', description: 'Símbolo "]"' },
  { value: ')', description: 'Símbolo ")"' },
  { value: '"', description: 'Símbolo """' },

  // acceptedComands 
  { value: 'IF', description: 'Comando "IF"' },
  { value: 'Else', description: 'Comando "Else"' },
  { value: 'EndIF', description: 'Comando "EndIF"' },
  { value: 'For', description: 'Comando "For"' },
  { value: 'EndFor', description: 'Comando "EndFor"' },
  { value: 'Read', description: 'Comando "Read"' },
  { value: 'Write', description: 'Comando "Write"' },
  { value: 'To', description: 'Comando "To"' },
  { value: 'Do', description: 'Comando "Do"' },

  // acceptedDataTypes
  { value: 'String', description: 'Tipo de dado "String"' },
  { value: 'Int', description: 'Tipo de dado "Int"' },
  { value: 'Float', description: 'Tipo de dado "Float"' },
  { value: 'Boolean', description: 'Tipo de dado "Boolean"' },

  // acceptedOperators 
  { value: '<', description: 'Operador "maior que"' },
  { value: '>', description: 'Operador "menor que"' },
  { value: '==', description: 'Operador de comparação "igual"' },
  { value: '+', description: 'Operador de adição' },
  { value: '-', description: 'Operador de subtração' },
  { value: '!=', description: 'Operador de comparação "diferente"' },
  { value: '*', description: 'Operador de multiplicação' },
  { value: '/', description: 'Operador de divisão' },
  { value: '!', description: 'Operador de negação' },
  { value: '>=', description: 'Operador "maior ou igual à"' },
  { value: '<=', description: 'Operador "menor ou igual à"' },
  { value: '=', description: 'Operador de atribuição' },
  { value: '+=', description: 'Operador de atribuição de adição' },
  { value: '-=', description: 'Operador de atribuição de subtração' },
  { value: '/=', description: 'Operador de atribuição de divisão' },
  { value: '*=', description: 'Operador de atribuição de multiplicação' },

  // TODO: EXCLUIR
  { value: 'idade', description: 'Token não reconhecido' },
]

// TODO: encontrar variaveis não

const NUMBER = /^[0-9]+$/;

const isNumber = character => NUMBER.test(character);

export const lexical = (code) => {
  const { variables, lastIndex } = getVariables(code)

  const foundTokens = variables

  let startingIndex = lastIndex

  while (true) {
    if (!code[startingIndex]) break

    const { value, description, nextIndex } = getValidToken(code, startingIndex, variables)

    if (nextIndex === 0) break;

    foundTokens.push({ value, description })

    startingIndex = nextIndex
  }

  return foundTokens
}

function getValidToken(code, startingIndex, variables) {
  let returningValue = {
    value: '',
    description: '',
    nextIndex: 0
  }

  // normal code
  for (let i = startingIndex; i <= code.length; i++) {
    const token = code.slice(startingIndex, i);

    // isDoubleQuote

    if (token === '"') {
      const nextDoubleQuoteIndex = code.indexOf('"', startingIndex + 1) + 1

      const userTypedString = code.slice(startingIndex, nextDoubleQuoteIndex)

      returningValue.value = userTypedString
      returningValue.description = 'Texto'
      returningValue.nextIndex = nextDoubleQuoteIndex

      return returningValue
    }

    // isNumber
    if (isNumber(token)) {
      let numberValue = token

      while (isNumber(code[i])) {
        numberValue += code[i];
        i++;
      }

      returningValue.value = numberValue
      returningValue.description = 'Número'
      returningValue.nextIndex = i

      return returningValue
    }

    // isUnknowVariable

    // isToken
    for (const acceptedToken of acceptedTokens) {
      if (acceptedToken.value.toLowerCase() == token.trim().toLowerCase()) {
        returningValue.value = acceptedToken.value
        returningValue.description = acceptedToken.description
        returningValue.nextIndex = i
      }
    }

    // isVariable
    for (const acceptedVariable of variables) {
      if (acceptedVariable.value.toLowerCase() == token.trim().toLowerCase()) {
        returningValue.value = acceptedVariable.value
        returningValue.description = acceptedVariable.description
        returningValue.nextIndex = i
      }
    }
  }

  return returningValue
}

function getVariables(code) {
  const lastIndex = code.indexOf('begin');

  const variableDeclarationSectionLines = code.substring(0, lastIndex).split('\n')

  let variables = []

  for (var i = 0; i < variableDeclarationSectionLines.length; i++) {
    const line = variableDeclarationSectionLines[i]

    if (line.trim() == "") continue

    if (line.trim().toUpperCase() == 'VAR') {
      variables.push({ value: 'Var', description: 'Indicador de início da sessão de declaração de variáveis' })

      continue
    }

    const variable = line.substring(0, line.indexOf(':')).trim()
    const type = line.substring(line.indexOf(':') + 1, line.length).trim()

    variables.push({ value: variable, description: `Variável "${variable}" do tipo "${type}"` })
  }

  return { variables, lastIndex }
}




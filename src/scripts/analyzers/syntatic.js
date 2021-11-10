import { isLetter, isParenthesis, isWhitespace, isTypeDeclarator, isValidType, isNumber } from "../../helpers/identify.js"


// * Na seção de variáveis, verificar se existem qualquer símbolo especial entre os nomes de variáveis, qualquer palavra diferente de Int, Float, Boolean ou String nos tipos de variáveis precisam ser detectados como erro.

// * Obrigatório existir a palavra begin, antes da palavra begin, só pode ter "var" e variáveis.

// * inicia com begin e termina com end, não pode ter nada antes de begin e nada depois de end exceto a seção de variáveis

// Comando IF=> Comando IF, variável ou constante, operador de comparação, variável ou constante, depois virá qualquer linha de código e obrigatoriamente precisará existir o comando Endif.

// Comando FOR => Comando para, variável, operador de atribuição, constante, comando TO, constante ou variável, comando DO, linhas de código e obrigatoriamente comando EndFor.

// Comando Write => Comando Write, símbolo(, variável ou símbolo " com texto aleátorio, símbolo aspas, vírgula, variável, símbolo ).

// Comando de atribuição => variável, símbolo "=" constante ou variável

// Comando Read => Comando Read, símbolo(, variável, símbolo).

// Operadores só podem ser aceitos: "=, +, -, /, *, <,>,!=,==,>=,<=,+=,-=,*=,/="

// Precisa validar se as variáveis usadas no código foram declaradas na seção var.

// Pode existir um comando IF dentro de outro Comando IF ou dentro de um comando FOR ou vice - versa, porém, cada IF ou FOR, precisa ter seu próprio EndIF ou EndFor

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
  
  for(let i = 0; i < variableDeclarationSectionLines.length; i++) {
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

    if(!(variableDeclaration.length === 2)) {
      errors.push({
        line: i + 1,
        error: 'Variável não está declarada corretamente'
      })

      continue
    }

    const variableName = variableDeclaration[0].trim()
    const variableType = variableDeclaration[1].trim().split('(')[0]

    if(isWhitespace(variableName)) {
      errors.push({
        line: i + 1,
        error: 'Variável não está declarada corretamente'
      })

      continue
    }

    if(!isValidType(variableType)) {
      errors.push({
        line: i + 1,
        error: `Tipo de variável "${variableType}" é inválido`
      })

      continue
    }

    variables.push({
      name: variableName,
      type: variableType
    })
  }

  return {
    errors, 
    variables
  }
}

function getCodeErrors(code, variables) {
  const errors = []

  const firstIndex = code.indexOf('begin');
  const lastIndex = code.substring(code.length -3, code.length)

  if (firstIndex === -1){
    errors.push({
      line: '',
      error: 'Obrigatório existir o token "begin" no início do código'
    })
  }

  if (lastIndex.trim().toLowerCase() !== 'end'){
    errors.push({
      line: '',
      error: 'Obrigatório existir o token "end" no final do código'
    })
  }

  const codeSectionLines = code.substring(firstIndex, code.length).split('\n')
  
  for(let i = 0; i < codeSectionLines.length; i++) {
    const codeLine = codeSectionLines[i]
    const codeLineIndex = variables.length + i + 2

    if(i === 0 && codeLine.trim().toLowerCase() !== 'begin') {
      errors.push({
        line: codeLineIndex,
        error: 'Obrigatório existir o token "begin" no início do código'
      })
      continue;
    }

    // IF

    // FOR

    // Read

    // Write

    // = 

    // Operators

    // Validate if variable is declared
  }

  return errors
}
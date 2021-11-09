import { isLetter, isParenthesis, isWhitespace, isTypeDeclarator, isValidType, isNumber } from "../../helpers/identify.js"


// Na seção de variáveis, verificar se existem qualquer símbolo especial entre os nomes de variáveis, qualquer palavra diferente de Int, Float, Boolean ou String nos tipos de variáveis precisam ser detectados como erro.
//  de linha a linha analisar a seção de variaveis e se for valido pegar a variavel

// Obrigatório existir a palavra begin, antes da palavra begin, só pode ter "var" e variáveis.

// inicia com begin e termina com end, não pode ter nada antes de begin e nada depois de end exceto a seção de variáveis

// Comando IF=> Comando IF, variável ou constante, operador de comparação, variável ou constante, depois virá qualquer linha de código e obrigatoriamente precisará existir o comando Endif.

// Comando FOR => Comando para, variável, operador de atribuição, constante, comando TO, constante ou variável, comando DO, linhas de código e obrigatoriamente comando EndFor.

// Comando Write => Comando Write, símbolo(, variável ou símbolo " com texto aleátorio, símbolo aspas, vírgula, variável, símbolo ).

// Comando de atribuição => variável, símbolo "=" constante ou variável

// Comando Read => Comando Read, símbolo(, variável, símbolo).

// Operadores só podem ser aceitos: "=, +, -, /, *, <,>,!=,==,>=,<=,+=,-=,*=,/="

// Precisa validar se as variáveis usadas no código foram declaradas na seção var.

// Pode existir um comando IF dentro de outro Comando IF ou dentro de um comando FOR ou vice - versa, porém, cada IF ou FOR, precisa ter seu próprio EndIF ou EndFor

export const syntatic = (code) => {
  const foundErrors = []

  const variableDeclarationErrors = getVariableDeclarationErrors(code)

  if(variableDeclarationErrors.length) {
    foundErrors.push(variableDeclarationErrors)
  }

  return foundErrors 
}

function getVariableDeclarationErrors(code) {
  const errors = []
  const tokens = []

  const lastIndex = code.indexOf('begin');

  const variableDeclarationSectionLines = code.substring(0, lastIndex).split('\n')

  for(let i = 0; i < variableDeclarationSectionLines.length; i++) {
    const declarations = variableDeclarationSectionLines[i]
    const tokens = []

    if (declarations.includes('var')) {
      continue;
    }

    let cursor = 0
    let symbol = '';
    let type = {}
    let varName = {}
    let typeValue = {}
    while (cursor < declarations.length) {
      type = {}
      varName = {}
      typeValue = {}
      const character = declarations[cursor]
      
      if (isWhitespace(character)) {
          cursor++;
          continue;
      }

      if (isLetter(character)) {
        symbol = character

        while (isLetter(input[++cursor])) {
          symbol += input[cursor]
        }

        varName = {
          value: symbol,
        }
        continue;
      }

      if (isTypeDeclarator(character)) {
        symbol = character

        if (isWhitespace(input[++cursor])) {
          cursor++;
          continue;
        }

        while (isLetter(input[++cursor])) {
          symbol += input[cursor]
        }

        if (!isValidType(symbol)) {
          throw new Error(`${symbol} is not valid`);
        }

        type = {
          type: symbol,
        }
        continue;
      }

      if (isParenthesis(character)) {
        if (isNumber(character)) {
          let number = character;
    
          while (isNumber(input[++cursor])) {
            number += input[cursor];
          }
    
          typeValue = {
            typeValue: number
          }
          continue;
        } else {
          throw new Error(`${character} is not valid`);
        }
      }

      throw new Error(`${character} is not valid`);
    }

    tokens.push({
      ...varName,
      ...type,
      ...typeValue
    })
  }

  return errors
}
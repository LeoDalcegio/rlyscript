/* token
  {
    value: string
    description: string
  }
*/

export const lexical = () => {
  const code = document.getElementById("input").value.toString();

  const acceptedTokens = [
    // acceptedIndicators
    { value: 'Begin', description: 'Indicador de início de código' },
    { value: 'End', description: '' },
    { value: 'Var', description: '' },

    // acceptedSymbols
    { value: ',', description: '' },
    { value: '(', description: '' },
    { value: '[', description: '' },
    { value: ']', description: '' },
    { value: ')', description: '' },
    { value: '"', description: '' },

    // acceptedComands 
    { value: 'IF', description: '' },
    { value: 'Else', description: '' },
    { value: 'EndIF', description: '' },
    { value: 'For', description: '' },
    { value: 'EndFor', description: '' },
    { value: 'Read', description: '' },
    { value: 'Write', description: '' },

    // acceptedDataTypes
    { value: 'String', description: '' },
    { value: 'Int', description: '' },
    { value: 'Float', description: '' },
    { value: 'Boolean', description: '' },

    // acceptedOperators 
    { value: '<', description: '' },
    { value: '>', description: '' },
    { value: '==', description: '' },
    { value: '+', description: '' },
    { value: '-', description: '' },
    { value: '!=', description: '' },
    { value: '*', description: '' },
    { value: '/', description: '' },
    { value: '!', description: '' },
    { value: '>=', description: '' },
    { value: '<=', description: '' },
    { value: '=', description: '' },
    { value: '+=', description: '' },
    { value: '-=', description: '' },
    { value: '/=', description: '' },
    { value: '=', description: '' },
  ]

  const tokens = []

  while (true) {
    let index = 0

    if (!code[index]) break

    const { token, nextIndex } = getValidToken(code, index)

    index = nextIndex
  }
}

function getValidToken(tokens, startingIndex) {
  let acumulativeEndIndex = 0

  for (let i = startingIndex; i < tokens.length; i++) {
    const token = array[i + acumulativeEndIndex];

    if (token && acceptedTokens.includes(token)) { // Not working, review
      return {
        value: token,
        description: ''
      } 
    }
  }
}

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

    if (!tokens[index]) break

    const { element, nextIndex } = getValidElement(tokens, tokens[index])

    index = nextIndex
  }
}

function getValidElement(tokens, startingIndex) {
  let acumulativeEndIndex = 0
  for (let i = startingIndex; i < tokens.length; i++) {
    const element = array[i + acumulativeEndIndex];

    if (element) {
      acceptedTokens.includes()
    }
  }
}

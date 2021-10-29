import { lexical } from './analyzers/lexical.js'

const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')

function testCode() {
  const output = lexical(inputElement.value.toString())

  outputElement.value = output
    .map((item) => item.value + ' - ' + item.description)
    .join('\n')
}


window.testCode = testCode
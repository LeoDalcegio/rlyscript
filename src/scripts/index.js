import { lexical } from './analyzers/lexical.js'

const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output')

function testCode() {
  lexical()
}


window.testCode = testCode
import { lexical } from './analyzers/lexical.js'
import { syntatic } from './analyzers/syntatic.js'

const inputElement = document.querySelector('#input')
const lexicalOutputElement = document.querySelector('#output-lexical')
const syntaticOutputElement = document.querySelector('#output-syntatic')

function createTestInput() {
  /*const testText = `var
  numero: int
  nome: string(40)
  cont: int
  QtdeMenor: int
  QtdeMaior: int
begin
  write("Digite seu nome")
  read(nome)
  write("Digite sua idade")
  read(idade)
  if idade >= 18
    write("Pode ser preso")
    QtdeMaior += 1

    if 1 = 1
      idade = 18
    endif
  else
    write("Não pode ser preso")
    QtdeMenor += 1
  endif
  for cont = 1 to 10 do
    write(cont)
  endfor
end`*/

  inputElement.value = testText
}

createTestInput()

function testCode() {
  const code = inputElement.value.toString()
  const lexicalOutput = lexical(code)
  const syntaticOutput = syntatic(code)

  lexicalOutputElement.value = lexicalOutput
    .map((item) => item.value + ' - ' + item.description)
    .join('\n')

  const variableDeclarationErrors = syntaticOutput.variableDeclarationAnalysis.errors

  syntaticOutputElement.value = variableDeclarationErrors
    .map((item) => item.error)
    .join('\n')

  syntaticOutputElement.value = syntaticOutputElement.value + '\n' + syntaticOutput.codeAnalysis
    .map((item) => item.error)
    .join('\n')

}


window.testCode = testCode
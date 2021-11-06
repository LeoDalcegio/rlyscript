import { lexical } from './analyzers/lexical.js'

const inputElement = document.querySelector('#input')
const lexicalOutputElement = document.querySelector('#output-lexical')
const syntaticOutputElement = document.querySelector('#output-syntatic')

function createTestInput() {
  const testText = `var
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
  else
    write("Não pode ser preso")
    QtdeMenor += 1
  endif
  for cont = 1 to 10 do
    write(cont)
  endfor
end`

  inputElement.value = testText
}

createTestInput()

function testCode() {
  const lexicalOutput = lexical(inputElement.value.toString())
  const syntaticOutput = syntatic(inputElement.value.toString())

  lexicalOutputElement.value = lexicalOutput
    .map((item) => item.value + ' - ' + item.description)
    .join('\n')

  syntaticOutputElement.value = syntaticOutput
    .map((item) => item.description)
    .join('\n')
}


window.testCode = testCode
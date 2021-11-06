import { lexical } from './analyzers/lexical.js'

const inputElement = document.querySelector('#input')
const outputElement = document.querySelector('#output-lexical')

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
  const output = lexical(inputElement.value.toString())

  outputElement.value = output
    .map((item) => item.value + ' - ' + item.description)
    .join('\n')
}


window.testCode = testCode
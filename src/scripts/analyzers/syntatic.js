import { isNumber } from "../../helpers/isNumber"


// Na seção de variáveis, verificar se existem qualquer símbolo especial entre os nomes de variáveis, qualquer palavra diferente de Int, Float, Boolean ou String nos tipos de variáveis precisam ser detectados como erro.

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

}
const LETTER = /[a-zA-Z]/;
const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;
const OPERATORS = ['+', '-', '*', '/', '%'];
const VALID_TYPES = ['int','float', 'string', 'boolean']

export const isLetter = character => LETTER.test(character);

export const isWhitespace = character => character.trim() === '';

export const isNumber = character => NUMBER.test(character);

export const isOpeningParenthesis = character => character === '(';

export const isClosingParenthesis = character => character === ')';

export const isParenthesis = character =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);

export const isQuote = character => character === '"';

export const isOperator = character => OPERATORS.includes(character);

export const isTypeDeclarator = character => character === ':';

export const isValidType = character => VALID_TYPES.includes(character.toLowerCase().trim());
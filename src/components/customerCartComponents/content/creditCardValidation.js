import amex from '../content/assets/amex.png';
import discover from '../content/assets/discover.png';
import masterCard from '../content/assets/masterCard.png';
import visa from '../content/assets/visa.png';

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMERICANEXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const numberArray = [
  {cardType: 'AMERICAN EXPRESS', firstNumber: 3, pattern: AMERICANEXPRESS, image: amex}, 
  {cardType: 'VISA', firstNumber: 4, pattern: OTHERCARDS, image: visa}, 
  {cardType: 'MASTERCARD', firstNumber: 5, pattern: OTHERCARDS, image: masterCard}, 
  {cardType: 'MASTERCARD', firstNumber: 2, pattern: OTHERCARDS, image: masterCard}, 
  {cardType: 'DISCOVER', firstNumber: 6, pattern: OTHERCARDS, image: discover},
];

const regExpArray = [
  {expression: /^4[0-9]{12}(?:[0-9]{3})?$/},
  {expression: /^3[47][0-9]{13}$/},
  {expression: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/},
  {expression: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/},
]

export const checkMajorCardType = (value) => {
  if (value) {
    for (const item of numberArray) {
      const {firstNumber} = item;
      if ((value[0] * 1) === firstNumber) {
        return item;
      }
    }
  }
}

export const validateMajorCardType = (value) => {
  if (value.length) {
    for (const regExp of regExpArray) {
      if (value.match(regExp.expression)) {
        return true;
      }
    }
    return false;
  }
}
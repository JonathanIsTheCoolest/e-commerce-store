import React from 'react';
import PaymentContentInputs from '../PaymentContentInputs/PaymentContentInputs';
import { nameAndTitle } from '../shippingValidations'; 
import { checkMajorCardType, validateMajorCardType, OTHERCARDS, AMERICANEXPRESS} from '../creditCardValidation';
import styles from './PaymentContent.module.css'

const delivery = 'delivery';
const confirmation = 'confirmation';

let yearArray = [];

const cardNumber = 'cardNumber';
const cvv = 'cvv';

const INIT_STATE = {
  cardholderName: '',
  cardNumber: '',
  month: '',
  year: '',
  expDate: '',
  cvv: '',
}

const MAX_LENGTH = {
  cardNumber: OTHERCARDS.length,
  cvv: 4,
}

const CARD_TYPE = {
  cardType: '',
  image: '',
}

class PaymentContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardDetails: INIT_STATE,
      errMessages: INIT_STATE,
      maxLength: MAX_LENGTH,
      cardType: CARD_TYPE,
      updatePaymentFunction: this.props.grabPaymentFunction(this.onClickGoToConfirmation, '')
    };
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.checkCardType(name, value);

    this.formatInputValues(name, value);
  }

  formatInputValues = (name, value) => {
    const {cardNumber: number} = this.state.maxLength
    let format = value.split(' ').join('');
    const newValue = value.replaceAll(' ', '');
    if ( name === cardNumber && number === OTHERCARDS.length ) {  
      this.onlyNumbers(name, newValue);
      this.formatOtherCards(name, value, format, 4);
    } else if ( name === cardNumber && number === AMERICANEXPRESS.length ) {
      this.onlyNumbers(name, newValue);
      this.formatAmexCards(name, value, format);
    } else if ( name === cvv ) {
      this.onlyNumbers(name, value);
    } else {
      this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: value } }))
    }
  }

  onlyNumbers = (name, value) => {
    const {maxLength} = this.props;
    const regEx = /^\d*$/;
    const numValue = value.match(regEx);
    const limitedValue = numValue.slice(0, -value.length + maxLength);
    const limitStatement = value.length > maxLength ? limitedValue : value;
    this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: limitStatement } }))
  }

  formatAmexCards = (name, value, format) => {
    if (format.length) {
      let amex = [];
      const captureOne = format.slice(0, 4);
      const captureTwo = format.slice(4, 10);
      const captureThree = format.slice(10, format.length);
      amex.push(captureOne);
      if (format.length > 4) {
        amex.push(captureTwo);
      }
      if (format.length > 10) {
        amex.push(captureThree);
      }
      amex = amex.join(' ');
      this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: amex } }))
    } else {
      this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: value } }))
    }
  }

  formatOtherCards = (name, value, format, spacing) => {
    if (format.length) {
      format = format.match(new RegExp(`.{1,${spacing}}`, 'g')).join(' ');
      this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: format } }))
    } else {
      this.setState((prevState) => ({ cardDetails: { ...prevState.cardDetails, [name]: value } }))
    }
  }

  updateExp = () => {
    const errMessage = 'Your card is expired';
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const {month, year} = this.state.cardDetails;
    const expMonth = (month.slice(month.length - 2) * 1);
    const expYear = (year.slice(year.length - 2) * 1);
    const exp = `${expMonth}/${expYear}`;

    this.setState((prevState) => ({cardDetails: { ...prevState.cardDetails, expDate: exp}}))

    if ((month.length && currentMonth > expMonth) && (year.length && currentYear >= (year * 1))) {
      this.setState((prevState) => ({errMessages: { ...prevState.errMessages, month: errMessage, year: errMessage, expDate: ''}}))
    } else if (month !== '' && year !== '') {
      this.setState((prevState) => ({errMessages: { ...prevState.errMessages, month: undefined, year: undefined, expDate: undefined}}))
    }
  }

  updateCVVError = (name, value) => {
    const {cvv: numberOnBack} = this.state.maxLength;
    const minLength = numberOnBack - 1;
    if ( name === cvv ) {
      this.onlyNumbers(name, value);
      if (!value.length) {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: '' } }))
      } else if (value.length < minLength) {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: `${name.toUpperCase()} must contain at least ${minLength} digits` } }))
      }
    }
  }

  nameAndTitleValidation = (e, key, placeHolder) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === key) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: nameAndTitle(value, placeHolder)  } }))
    }
  }

  checkCardType = (name, value) => {
    if (name === cardNumber && value.length && checkMajorCardType(value)) {
      const {cardType, pattern, image} = checkMajorCardType(value);
      this.setState((prevState) => ({
        maxLength: { ...prevState.maxLength, cardNumber: pattern.length },
        cardType: { cardType: cardType, image: image },
      }))
    } else if (name === cardNumber && !value.length) {
      this.setState({ cardType: CARD_TYPE })
    }
  }

  validateCard = (name, value) => {
    if (name === cardNumber && value.length) {
      const newValue = value.replaceAll(' ', '');
      if (validateMajorCardType(newValue)) {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, cardNumber: undefined } }))
      } else {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, cardNumber: 'This is not a valid credit card entry' } }))
      }
    }
  }

  onBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: undefined } }))
    } else if (!value.length) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: '' } }))
    }

    this.updateExp();

    this.updateCVVError(name, value);

    this.validateCard(name, value);

    this.nameAndTitleValidation(e, 'cardholderName', 'Cardholder Name');
  }

  requiredCheck = () => {
    const cardDetails = this.state.cardDetails;
    for (const item in cardDetails) {
      if (cardDetails[item] === '') {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [item]: 'required' } }))
      }
    }
  }

  generateYears = () => {
    yearArray = [];
    const years = 11;
    const currentYear = new Date().getFullYear();
    for (let x = 0; x < years; x++) {
      const nextYear = currentYear + x;
      yearArray.push(nextYear);
    }
  }

  onClickBackToDelivery = () => {
    this.props.passUpdate(undefined)
    this.props.updateLoad(delivery);
  }

  onClickGoToConfirmation = () => {
    this.requiredCheck();
    const errMessages = this.state.errMessages;
    const errMessageLength = Object.keys(errMessages).length;
    const undefinedArray = [];
    const cardDetails = {...this.state.cardDetails, ...this.state.cardType};
    for (const err in errMessages) {
      while (errMessages[err] !== undefined) {
        break;
      } if (errMessages[err] === undefined) {
        undefinedArray.push(errMessages[err])
        if (errMessageLength === undefinedArray.length) {
          this.props.grabPaymentFunction(this.onClickGoToPayment, cardDetails);
          this.props.updateLoad(confirmation);
          return true;
        }
      }
    }
  }

  render() {
    this.generateYears()

    const {cardholderName: name, cardNumber: number, expDate, cvv, month: monthError, year: yearError} = this.state.errMessages;

    const {cardNumber: numberLength, cvv: cvvLength} = this.state.maxLength;

    const {cardType, image} = this.state.cardType;

    const monthOptions = ['January 01', 'February 02', 'March 03', 'April 04', 'May 05', 'June 06', 'July 07', 'August 08', 'September 09', 'October 10', 'November 11', 'December 12'];
    const yearOptions = yearArray;

    const month = {label: '', labelTwo: 'Month', name: 'month', options: monthOptions, className: styles.month, err: monthError };
    const year = {label: '', labelTwo: 'Year', name: 'year', options: yearOptions, className: styles.year, err: yearError };

    const inputData = [
      {label: 'Cardholder Name', labelTwo: 'Full Name As It Appears On Card', name: 'cardholderName', type: 'text', className: styles.cardholderName, err: name,},
      {label: 'Card Number', labelTwo: 'XXXX XXXX XXXX 1234', name: 'cardNumber', type: 'text', className: styles.cardNumber, err: number, maxLength: numberLength, image: image, cardType: cardType},
      {label: 'Exp. Date', type: 'select', name: 'expDate', className: styles.monthYearContainer, inputs: [month, year], err: expDate},
      {label: 'CVV', labelTwo: '123', name: 'cvv', type: 'text', className: styles.cvv, err: cvv, maxLength: cvvLength},
      {label: ' ', labelTwo: `Pay $${this.props.passCartTotal}`, name: 'button', type: 'button', className: styles.paymentButton},
    ]
    return (
      <div className={styles.paymentContainer}>
        <h2>Payment Information</h2>
        <hr />
        { inputData.map((item, index) => (
          <PaymentContentInputs
            key={`${item.name}${index}`}
            items={item}
            value={this.state.cardDetails[item.name]}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onClick={this.onClickGoToConfirmation}
          />
        )) }
        <button className={styles.backToDeliveryButton} onClick={this.onClickBackToDelivery}>Back To Delivery</button>
      </div>
    )
  }
}

export default PaymentContent;
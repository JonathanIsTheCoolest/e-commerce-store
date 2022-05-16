import React from 'react';
import ShippingContentInputs from '../ShippingContentInputs/ShippingContentInputs';
import ShippingRadioButtons from '../ShippingRadioButtons/ShippingRadioButtons';
import { nameAndTitle, addressValidation } from '../shippingValidations';
import styles from './ShippingContent.module.css'

const cart = 'cart';
const standard = 'standard'

const keys = {
  addressTitle: '',
  fullName: '',
  address: '',
  zipCode: '',
  country: '',
  state: '',
  city: '',
  phoneAreaCode: '',
  phoneNumber: '',
  radioButtons: standard,
}

const { radioButtons, ...errMessages} = keys; 

const INIT_STATE = {
  shippingInfo: keys,
  errMessages: errMessages,
}

class ShippingContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...INIT_STATE,
      updateCheckoutFunction: this.props.grabCheckoutFunction(this.onClickGoToCheckout, ''),
    };
  }

  onChange = (e, altValue) => {
    const name = e.target.name;
    const value = e.target.value;
    const maxLength = e.target.maxLength;
    if (maxLength > 0) {
      this.setState((prevState) => ({ shippingInfo: { ...prevState.shippingInfo, [name]: altValue } }))
    } else {
      this.setState((prevState) => ({ shippingInfo: { ...prevState.shippingInfo, [name]: value } }))
    }
  }

  nameAndTitleValidation = (e, key, placeHolder) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === key) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: nameAndTitle(value, placeHolder)  } }))
    }
  }

  superLightAddressValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'address') {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: addressValidation(value)  } }))
    }
  }

  onBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const maxLength = e.target.maxLength;

    if (maxLength > 0 && value.length !== maxLength && value.length) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: `Must contain ${maxLength} characters ` } }))
    } else if (maxLength > 0 && value.length === maxLength) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: undefined } }))
    } else if (maxLength > 0 && !value.length) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: '' } }))
    } else if (value.length && value !== 'select') {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: undefined } }))
    } else if (!value.length) {
      this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [name]: '' } }))
    }

    this.nameAndTitleValidation(e, 'addressTitle', 'Address title');
    this.nameAndTitleValidation(e, 'fullName', 'Name');
    this.superLightAddressValidation(e);
  }

  requiredCheck = () => {
    const shippingInfo = this.state.shippingInfo;
    for (const item in shippingInfo) {
      if (shippingInfo[item] === '' || shippingInfo[item] === 'select') {
        this.setState((prevState) => ({ errMessages: { ...prevState.errMessages, [item]: 'required' } }))
      }
    }
  }

  onClickGoToCheckout = () => {
    this.requiredCheck();
    const errMessages = this.state.errMessages;
    const errMessageLength = Object.keys(errMessages).length;
    const undefinedArray = [];
    for (const err in errMessages) {
      while (errMessages[err] !== undefined) {
        break;
      } if (errMessages[err] === undefined) {
        undefinedArray.push(errMessages[err])
        if (errMessageLength === undefinedArray.length) {
          this.props.grabCheckoutFunction(this.onClickGoToCheckout, this.state.shippingInfo);
          this.props.passUpdate(this.state.shippingInfo.radioButtons)
          return true;
        }
      }
    }
  }

  onClickBackToCart = () => {
    this.props.updateLoad(cart);
  }

  render() {
    const {addressTitle: title, fullName: name, address, zipCode: zip, phoneAreaCode: areaCode, phoneNumber: number} = this.state.errMessages;

    const radioButtons = this.state.shippingInfo.radioButtons;

    const standardText = 'Delivery in 4-6 Business Days - Free with purchases of $40 or more, else $3';
    const expressText = 'Delivery in 1-3 Business Days - $5.00';

    const inputData = [
      {label: 'Address Title', labelTwo: 'Home, Office, Warehouse', name: 'addressTitle', type: 'text', class: styles.addressTitle, err: title,},
      {label: 'Full Name', name: 'fullName', type: 'text', class: styles.fullName, err: name,},
      {label: 'Address', name: 'address', type: 'text', class: styles.address, classTwo: styles.addressBottom, err: address,},
      {label: 'Zip Code', name: 'zipCode', type: 'text', class: styles.zipCode, maxLength: 5, err: zip,},
    ]

    const phoneData = [
      {label: 'Phone Number', labelTwo: 'Area Code', name: 'phoneAreaCode', type: 'text', relationship: 'phone', class: styles.phoneAreaCode, maxLength: 3, err: areaCode,},
      {labelTwo: 'Phone Number', name: 'phoneNumber', type: 'text', relationship: 'phone', class: styles.phoneNumber, maxLength: 7, err: number,},
    ]

    const radioData = [
      {buttonText: 'STANDARD', value: 'standard', name: 'radioButtons', type: 'radio', text: standardText},
      {buttonText: 'EXPRESS', value: 'express', name: 'radioButtons', type: 'radio', text: expressText},
    ]

    return (
      <div onLoad={this.state.updateCheckoutFunction}>
        <h2>Shipping Information</h2>
        <hr />
        { inputData.map((item, index) => (
          <ShippingContentInputs
            onChange={this.onChange}
            onBlur={this.onBlur}
            key={`${item.name}${index}`}
            placeHolder={item.label}
            placeHolderTwo={item.labelTwo}
            type={item.type}
            name={item.name}
            className={item.class}
            classTwo={item.classTwo}
            maxLength={item.maxLength}
            err={item.err}
            allErrors={this.state.errMessages}
          />
        )) }
        <div className={styles.phoneInputContainer}>
          { phoneData.map((item, index) => (
            <ShippingContentInputs
              onChange={this.onChange}
              onBlur={this.onBlur}
              key={`${item.name}${index}`}
              placeHolder={item.label}
              placeHolderTwo={item.labelTwo}
              placeHolderThree={item.labelTwo}
              type={item.type}
              name={item.name}
              className={item.class}
              classTwo={styles.numberTop}
              maxLength={item.maxLength}
              err={item.err}
              allErrors={this.state.errMessages}
            />
          )) }
        </div>
        <hr />
        <h2>Shipping Method</h2>
        { radioData.map((item, index) => (
          <ShippingRadioButtons
            onChange={this.onChange}
            type={item.type} 
            value={item.value} 
            name={item.name} 
            id={item.value}
            text={item.text}
            checked={radioButtons === item.value ? true : false}
            className={styles.radioButtons}
            placeholder={item.buttonText}
            key={`${item.value}${index}`}
          />
        ))}
        <button onClick={this.onClickBackToCart} className={styles.backToCartButton}>Back To Cart</button>
      </div>
    )
  }
}

export default ShippingContent;
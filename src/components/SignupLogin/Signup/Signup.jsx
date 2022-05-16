import React from 'react';
import SignupInputs from './SignupInputs/SignupInputs';
import styles from './Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { emailValidation, passwordValidation, confirmPasswordValidation, nameValidation } from '../signupValidations';

const INIT_STATE = {
  firstName: '',
  lastName: '',
  postcode: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const STATE = {
  loginCredentials: INIT_STATE,
  error: INIT_STATE,
  topErrorMessage: ''
}

export const credentialsArray = [];

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = STATE;
  }

  validateEmail = (e) => {
    const mail = 'email';
    const name = e.target.name
    const {email} = this.state.loginCredentials;
    if (name === mail) {
      this.setState((prevState) => ({ error: { ...prevState.error, email: emailValidation(email) } }))
    }
  }

  validatePassword = (e) => {
    const pass = 'password';
    const name = e.target.name;
    const {password} = this.state.loginCredentials;
    if (name === pass) {
      this.setState((prevState) => ({ error: { ...prevState.error, password: passwordValidation(password) } }))
    }
    this.validateConfirmPasswordTwo(e);
  }
  
  validateConfirmPassword = (e) => {
    const conPass = 'confirmPassword';
    const name = e.target.name;
    const {password, confirmPassword} = this.state.loginCredentials;
    if (name === conPass) {
      this.setState((prevState) => ({ error: { ...prevState.error, confirmPassword: confirmPasswordValidation(password, confirmPassword) } }))
    }
  }
  
  validateConfirmPasswordTwo = (e) => {
    const required = 'required';
    const pass = 'password';
    const name = e.target.name;
    const {password, confirmPassword} = this.state.loginCredentials;
    if (name === pass && (confirmPassword !== '' && confirmPassword !== required)) {
      this.setState((prevState) => ({ error: { ...prevState.error, confirmPassword: confirmPasswordValidation(password, confirmPassword) } }))
    }  
  }
  

  validateFirstName = (e) => {
    const first = 'firstName';
    const name = e.target.name;
    const { firstName } = this.state.loginCredentials;
    if (name === first) {
      this.setState((prevState) => ({ error: { ...prevState.error, firstName: nameValidation(firstName) } }))
    }
  }

  validateLastName = (e) => {
    const last = 'lastName';
    const name = e.target.name;
    const { lastName } = this.state.loginCredentials;
    if (name === last) {
      this.setState((prevState) => ({ error: { ...prevState.error, lastName: nameValidation(lastName) } }))
    }
  }

  onBlur = (e) => {
    this.validateEmail(e);
    this.validatePassword(e);
    this.validateConfirmPassword(e);
    this.validateFirstName(e);
    this.validateLastName(e);
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({ loginCredentials: { ...prevState.loginCredentials, [name]: value } })); 
  }
  
  requirementCheck = (e) => {
    const required = 'required';
    const errState = this.state.error;
    const topErrMessage = 'We\'re sorry, but one or more fields are incomplete or incorrect. Find error(s).';
    for (let err in errState) {
      const errStateCheck = errState.confirmPassword === undefined && errState.password === undefined && errState.email === undefined && errState.firstName === undefined && errState.lastName === undefined;
      if ( errState[err] === '' ) {
        errState[err] = required;
        this.setState((prevState) => ({
          error: { ...prevState.error, [err]: errState[err], },
          topErrorMessage: topErrMessage,
        }))
      } else if ( errStateCheck ) {
        this.setState((prevState) => ({
          error: { ...prevState.error, [err]: errState[err], },
          topErrorMessage: undefined,
        }))
      }
    }
  }

  callBackTrigger = (e) => {
    const {email, password} = this.state.loginCredentials;
    credentialsArray.push({email, password});
    this.props.parentCallBack(credentialsArray);
    this.props.func(e);
  }

  render() {

    const err = this.state.error;
    const errCheck = (err.confirmPassword === undefined && err.password === undefined && err.email === undefined && err.firstName === undefined && err.lastName === undefined);
    const passwordRequirementText = 'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & () _ +';

    const inputData = [
      {label: 'E-Mail Address*', name: 'email', type: 'text', error: err.email},
      {label: 'Create Password*', name: 'password', type: 'password', text: passwordRequirementText, error: err.password},
      {label: 'Confirm Password*', name: 'confirmPassword', type: 'password', error: err.confirmPassword},
      {label: 'First Name*', name: 'firstName', type: 'text', error: err.firstName},
      {label: 'Last Name*', name: 'lastName', type: 'text', error: err.lastName},
      {label: 'Postcode', name: 'postcode', type: 'number', error: err.postcode = undefined},
    ];

    return(
      <div>
        <div className={`${styles.topErrorMessage} ${styles.topErrorMessageSignup}`}>{this.state.topErrorMessage}</div>
        <form onSubmit={this.onSubmit} className={styles.form}>
          {inputData.length ? inputData.map((item, index) =>  ( 
            <SignupInputs
              placeholder={item.label}
              type={item.type}
              onChange={this.onChange}
              onBlur={this.onBlur}
              name={item.name}
              className={styles.inputs}
              datatext={item.text}
              key={`${item.name}${index}`}
              errormessage={item.error}
            />
            )): null
          }
          <input 
            type="submit" 
            value="SAVE"
            className={`${styles.buttons} ${styles.inputs} ${styles.buttonTop}`}
            onClick={ errCheck ? this.callBackTrigger : this.requirementCheck}
          />
          <span className={styles.or}><p>or</p></span>
          <button 
          className={
            `${styles.buttons} ${styles.inputs} ${styles.buttonBottom}`
          }>
            <FontAwesomeIcon icon={faFacebookF} className={styles.facebookIcon}/>
            SIGN UP WITH FACEBOOK
          </button>
        </form>
      </div>
    )
  }
}

export default Signup;

















































  // validateGeneral = (ifVar, destructVarOne, destructVarTwo, func, e) => {
  //   const ifVariable = ifVar;
  //   const name = e.target.name;
  //   const destructOne = destructVarOne;
  //   const destructTwo = destructVarTwo;
  //   if (name === ifVariable) {
  //     this.setState((prevState) => ({ error: { ...prevState.error, lastName: func(destructOne, destructTwo) } }))
  //   }
  // }

  // onBlur = (e) => {
  //   const { email, password, confirmPassword, firstName, lastName } = this.state.loginCredentials
  //   this.validateGeneral('email', email, undefined, emailValidation, e);
  //   this.validatePassword(e);
  //   this.validateGeneral('confirmPassword', password, confirmPassword, confirmPasswordValidation, e);
  //   this.validateGeneral('firstName', firstName, undefined, nameValidation, e);
  //   this.validateGeneral('lastName', lastName, undefined, nameValidation, e);

  // }
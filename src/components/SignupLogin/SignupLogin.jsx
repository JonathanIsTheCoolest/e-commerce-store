import React from 'react';
import SignupLoginRadios from './SignupLoginRadios/SignupLoginRadios';
import styles from './SignupLogin.module.css'
import Signup from './Signup/Signup';
import Login from './Login/Login';

const createAccount = 'createAccount';
const signIn = 'signIn';
const signupLogin = 'signupLogin'

const INIT_STATE = {
  radioGroup: { radioButtons: signIn},
  loginCredentials: '',
  loadComponent: signupLogin,
}

class SignupLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = INIT_STATE;
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ radioGroup: { [name]: value } })
  }

  onClickLogin = (e) => {
    e.preventDefault();
    this.setState({ radioGroup: { radioButtons:  createAccount } })
  }

  onClickCreateAccountBtnTop = (e) => {
    e.preventDefault();
    this.setState({ radioGroup: { radioButtons: signIn } });
  }

  loginCallBack = (childData) => {
    this.setState({ loadComponent: childData })
    this.props.parentCallBack(childData);
  }

  signupCallBack = (childData) => {
    this.setState({ loginCredentials: childData })
  }

  render() {

    const radioButtons = this.state.radioGroup.radioButtons;
    const loginCredentials = this.state.loginCredentials;
    const radioButtonObject = [
      {buttonText: 'SIGN IN', value: signIn, name: 'radioButtons', type: 'radio', },
      {buttonText: 'CREATE ACCOUNT', value: createAccount, name: 'radioButtons', type: 'radio', },
    ]

    return(
      <div className={styles.container}>
        <div className={styles.signupLoginContainer}>
          <div className={styles.radioContainer}>
            {radioButtonObject.map((item, index) => 
              <SignupLoginRadios
                onChange={this.onChange} 
                type={item.type} 
                value={item.value} 
                name={item.name} 
                id={item.value}
                checked={radioButtons === item.value ? true : false}
                className={styles.radioButtons}
                placeholder={item.buttonText}
                key={`${item.value}${index}`}
              />
            )}
          </div>
          { 
          radioButtons === '' || radioButtons === signIn ?
          <Login 
            func={this.onClickLogin} 
            parentCallBack={this.loginCallBack} 
            accountCredentials={loginCredentials}
          /> :
          <Signup
            parentCallBack={this.signupCallBack}
            func={this.onClickCreateAccountBtnTop}
          />
          }
        </div>
      </div>
    )
  }
}

export default SignupLogin;
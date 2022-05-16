import React from 'react';
import LoginInputs from './LoginInputs/LoginInputs';
import styles from '../Signup/Signup.module.css';

const signupLogin = 'signupLogin';
const customerCart = 'customerCart';

const INIT_STATE = {
  signInCredentials: {email: '', password: '',},
  topErrorMessage: '',
  loadComponent: signupLogin,
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = INIT_STATE;
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.parentCallBack(this.state.loadComponent);
  }

  onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({ signInCredentials: { ...prevState.signInCredentials, [name]: value } })); 
  }

  onClickSignIn = () => {
    const { email, password } = this.state.signInCredentials;
    const accountCredentials = this.props.accountCredentials;
    const topErrorMessage = 'Email and/or password did not match, or were incomplete. Please try again.';
    for (let credentials in accountCredentials) {
      const eTwo = accountCredentials[credentials].email;
      const pTwo = accountCredentials[credentials].password;
      if ((email !== eTwo || password !== pTwo) || (email === '' || password === '') ) {
        this.setState({ 
          topErrorMessage: topErrorMessage,
          loadComponent: signupLogin, 
        })
      } else if (email === eTwo && password === pTwo) {
        this.setState({ 
          topErrorMessage: undefined,
          loadComponent: customerCart,
        })
        break;
      }
    }
  }

  render() {

    const inputData = [
      {label: 'E-Mail Address*', name: 'email', type: 'email'},
      {label: 'Password*', name: 'password', type: 'password'},
    ];

    return(
      <div>
        <div className={`${styles.topErrorMessage} ${styles.topErrorMessageLogin}`}>{this.state.topErrorMessage}</div>
        <form onSubmit={this.onSubmit} className={styles.form}>
          {inputData.map((item, index) => 
            <LoginInputs
              placeholder={item.label}
              name={item.name}
              type={item.type}
              className={styles.inputs}
              onChange={this.onChange}
              key={`${item.name}${index}`}
            />
          )}
          <input onClick={this.onClickSignIn} type="submit" value="SIGN IN" className={`${styles.buttons} ${styles.inputs} ${styles.buttonTop}`}/>
          <span className={styles.or}><p>or</p></span>
          <button onClick={this.props.func} className={`${styles.buttons} ${styles.inputs} ${styles.buttonBottom}`}>CREATE ACCOUNT</button>
        </form>
      </div>
    )
  }
}

export default Login;
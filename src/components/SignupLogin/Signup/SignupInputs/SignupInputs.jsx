import React from 'react';
import styles from './SignupInputs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const password = 'password';
const confirmPassword = 'confirmPassword';

class SignupInputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      allProps: this.props,
    }
  }
  
  handleEyeClick = () => {
    const text = 'text';
    const password = 'password';
    const isHidden = this.state.isHidden;
    if (isHidden) {
      this.setState((prevState) => ({ 
        isHidden: false,
        allProps: { ...prevState.allProps, type: text }
      }))
    } else if (!isHidden) {
      this.setState((prevState) => ({ 
        isHidden: true,
        allProps: { ...prevState.allProps, type: password }
      }))
    }
  }

  injectEye = () => {
    const isHidden = this.state.isHidden;
    const name = this.state.allProps.name;
    if ( name === password || name === confirmPassword ) {
      if (isHidden) {
        return (
          <div className={styles.eyeIcon}>
            <FontAwesomeIcon icon={faEye} onClick={this.handleEyeClick}/>
          </div>
        )
      } else if (!isHidden) {
        return (
          <div className={styles.eyeIcon}>
            <FontAwesomeIcon icon={faEyeSlash} onClick={this.handleEyeClick}/>
          </div>
        )
      }
    }
  }

  render() {
    const propsInState = this.state.allProps;
    return(
      <div>
        <label htmlFor={propsInState.name}>
          <h3>{propsInState.placeholder}</h3>
          <div className={styles.inputHolder}>
            <input {...propsInState} />
            {this.injectEye()}
            <br />
          </div>
          <span className={styles.errorM}>{this.props.errormessage}</span>
          <p className={styles.span}>{propsInState.datatext}</p>
        </label>
      </div>
    )
  }
}

export default SignupInputs;
import React from 'react';
import styles from '../SignupLogin.module.css'

class SignupLoginRadios extends React.Component {
  render() {
    const props = this.props;
    return(
      <div>
        <label htmlFor={props.id} className={styles.individualRadioContainer}>
          <input {...props}/>
          <div className={styles.radioText}>{props.placeholder}</div>
        </label>
      </div>
    )
  }
}

export default SignupLoginRadios;
import React from 'react';
import styles from '../../Signup/SignupInputs/SignupInputs.module.css';

class LoginInputs extends React.Component {
  // constructor(props) {
  //   super(props) 
  //   this.state = { propsInState: this.props };
  // }

  render() {
    // const state = this.state.propsInState;
    const props = this.props;
    return(
      <div>
        <label htmlFor={props.name}>
          <h3>{props.placeholder}</h3>
          <div className={styles.inputHolder}>
            <input {...props} />
            <br />
          </div>
        </label>
      </div>
    )
  }
}

export default LoginInputs;
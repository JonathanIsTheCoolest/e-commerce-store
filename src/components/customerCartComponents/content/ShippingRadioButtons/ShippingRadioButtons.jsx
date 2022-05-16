import React from 'react';
import styles from '../ShippingContent/ShippingContent.module.css'

class ShippingRadioButtons extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className={styles.radioContainer}>
        <label htmlFor={props.id} className={styles.individualRadioContainer}>
          <input onChange={this.props.onChange} {...props}/>
          <div className={styles.radioHeader}>{props.placeholder}</div>
          <p className={styles.radioText}>{props.text}</p>
        </label>
      </div>
    )
  }
}

export default ShippingRadioButtons
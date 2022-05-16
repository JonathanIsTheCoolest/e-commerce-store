import React from 'react';
import styles from '../ShippingContent/ShippingContent.module.css';
import stylesTwo from '../PaymentContent/PaymentContent.module.css';

class PaymentSelectInputs extends React.Component {
  render() {
    const {label, labelTwo, name, className, err, options} = this.props.items;
    return (
      <div className={ `${styles.inputContainer} ${stylesTwo.fixMargin}` }>
      <label className={className} htmlFor={name}>
        <h3 className={ label ? styles.inputHeaders : null }>{label}</h3>
        <div className={styles.errInputContainer}>
          <select onBlur={this.props.onBlur} onChange={this.props.onChange} className={`${className} ${stylesTwo.selectInputs} ${styles.allInputs}`} name={name} id={name}>
            <option hidden value={labelTwo}>{labelTwo}</option>
            {options.map((item, index) => (
              <option key={`${item}${index}`} value={item}>{item}</option>
            ))}
          </select>
          <div className={styles.errMessages}>{err !== undefined ? (err.length ? err : null) : null}</div>
        </div>
        <br />
      </label>
    </div>
    )
  }
}

export default PaymentSelectInputs
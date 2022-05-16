import React from 'react';
import styles from '../ShippingContent/ShippingContent.module.css';

class ShippingSelectInputs extends React.Component {
  render() {
    const usa = 'usa'
    const { name, value, className, err } = this.props;
    return(
      <div className={ `${styles.inputContainer} ${styles.selectInputs} ${className}`}>
        <label htmlFor={name} >
          <h3>{name[0].toUpperCase().concat(name.slice(1))}</h3>
          <div className={styles.errInputContainer}>
            <select onBlur={this.props.onBlur} onChange={this.props.onChange} className={className} name={name} id={name}>
              <option hidden value="select">Select</option>
              <option value={value}>
                {value === usa ? value.toUpperCase() : value[0].toUpperCase().concat(value.slice(1))}
              </option>
            </select>
            <div className={styles.errMessages}>{err}</div>
          </div>
          <br />
        </label>
      </div>
    )
  }
}

export default ShippingSelectInputs;
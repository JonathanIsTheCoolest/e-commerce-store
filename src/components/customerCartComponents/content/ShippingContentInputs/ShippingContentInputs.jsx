import React from 'react';
import ShippingSelectInputs from '../ShippingSelectInputs/ShippingSelectInputs';
import styles from '../ShippingContent/ShippingContent.module.css';

class ShippingContentInputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newValue: '',
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    const {maxLength} = this.props;
    const regEx = /^\d*$/;
    const numValue = value.match(regEx);
    const limitedValue = maxLength > 0 ? numValue.slice(0, -value.length + maxLength) : null;
    const limitStatement = value.length > maxLength ? limitedValue : value;
    this.setState({ newValue: limitStatement })
    this.props.onChange(e, limitStatement);
  }

  onBlur = (e) => {
    this.props.onBlur(e);
  }

  render () {
    const zipCode = 'zipCode';
    const {placeHolder, placeHolderTwo, type, name, className, classTwo, maxLength, err, allErrors} = this.props;
    const {country, state, city} = allErrors;

    const selectInputData = [
      {name: 'country', value: 'usa', class: styles.countrySelect, err: country,},
      {name: 'state', value: 'california', class: styles.stateSelect, err: state,},
      {name: 'city', value: 'berkeley', class: styles.citySelect, err: city,},
    ]

    return (
      <div className={name === zipCode ? styles.selectContainer : null}>
        <div className={ `${styles.inputContainer} ${classTwo}` }>
          <label className={className} htmlFor={name}>
            <h3 className={ placeHolder ? styles.inputHeaders : null }>{placeHolder}</h3>
            <div className={styles.errInputContainer}>
              <input 
                onChange={this.onChange}
                onBlur={this.onBlur}
                className={`${styles.allInputs} ${className}`} 
                placeholder={ placeHolderTwo ? placeHolderTwo : placeHolder }
                type={type} 
                name={name}
                id={name}
                maxLength={maxLength}
                value={maxLength !== undefined ? this.state.newValue : this.value}
              />
              <div className={styles.errMessages}>{err !== undefined ? (err.length ? err : null) : null}</div>
            </div>
            <br />
          </label>
        </div>
        {
          name === zipCode ? 
          selectInputData.map((item, index) => (
            <ShippingSelectInputs 
              onChange={this.props.onChange}
              onBlur={this.onBlur}
              key={`${item.name}${index}`}
              name={item.name}
              value={item.value}
              className={item.class}
              err={item.err}
            />
          ))
          : null 
        }
      </div>
    )
  }
}

export default ShippingContentInputs;
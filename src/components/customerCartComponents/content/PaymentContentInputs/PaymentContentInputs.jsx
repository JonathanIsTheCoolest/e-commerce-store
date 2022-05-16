import React from 'react';
import PaymentSelectInputs from '../PaymentSelectInputs/PaymentSelectInputs';
import styles from '../ShippingContent/ShippingContent.module.css'

class PaymentContentInputs extends React.Component {

  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    const {label, labelTwo, name, type, className, err, maxLength, inputs, image, cardType} = this.props.items;
    return (
      <div>
        {type === 'text' ?
          <div className={ `${styles.inputContainer}` }>
            <label className={className} htmlFor={name}>
              <h3 className={ label ? styles.inputHeaders : null }>{label}</h3>
              <div className={styles.errInputContainer}>
                <input
                  onChange={this.onChange}
                  onBlur={this.props.onBlur}
                  className={`${styles.allInputs} ${className}`} 
                  placeholder={ labelTwo ? labelTwo : label }
                  value={this.props.value}
                  type={type} 
                  name={name}
                  id={name}
                  maxLength={maxLength}
                />
                <div className={styles.creditCardImageContainer}>
                  {image ? <img className={styles.creditCardImage} src={image} alt={cardType} /> : null}
                </div>
                <div className={styles.errMessages}>{err !== undefined ? (err.length ? err : null) : null}</div>
              </div>
              <br />
            </label>
          </div>
          : null
        }
        {type === 'select' ? 
          <div className={ `${styles.inputContainer} ${className}` }>
            <label htmlFor={name}>
              <h3 className={ label ? styles.inputHeaders : null }>{label}</h3>
              {inputs.map((item, index) => (
                <PaymentSelectInputs
                  onChange={this.props.onChange}
                  onBlur={this.props.onBlur}
                  key={`${item.name}${index}`}
                  items={item}
                />
              ))}
            </label>
          </div>
          : null
        }
        {type === 'button' ? 
          <div className={ `${styles.inputContainer}`}>
            <label className={className} htmlFor={name}>
              <h3 className={ label ? styles.inputHeaders : null }>{label}</h3>
              <input onClick={this.props.onClick} type={type} value={labelTwo} className={className} />
            </label>
          </div>
        : null
        }
      </div>
    )
  }
}

export default PaymentContentInputs;
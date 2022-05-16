import React from 'react';
import CartSummaryContent from '../CartSummaryContent/CartSummaryContent';
import styles from './CartSummary.module.css';

const cart = 'cart';
const delivery = 'delivery';
const payment = 'payment';
const confirmation = 'confirmation';

const INIT_STATE = {
  quantity: 0,
  cartSub: 0,
  shippAndHandle: 0,
  discount: 0,
  cartTotal: 0,
  promo: '',
};

const initQuantityValue = 0;

let reducedDataArray = [];

class CartSummary extends React.Component {
  constructor(props) {
    super(props) 
    this.state = INIT_STATE;
  }

  resetState = () => {
    this.setState({ ...INIT_STATE })
  }

  filterAndReduce = () => {

    reducedDataArray = [];

    let data = this.props.dataPass;
    if (!data.length) {data = []};

    const reduced = data.reduce((previousValue, currentValue) => {
      previousValue[currentValue.product.productKeyName] = previousValue[currentValue.product.productKeyName] || [];
      previousValue[currentValue.product.productKeyName].push(currentValue);
      return previousValue
    }, {})

    for (const item in reduced) {
      const newArray = reduced[item]
      const objects = newArray.reduce((previousValue, currentValue) => {
        const newObject = {
          product: currentValue.product,
          total: ((previousValue.total * 1) + (currentValue.total * 1)).toFixed(2),
          quantity: (previousValue.quantity * 1) + (currentValue.quantity * 1),
        }
        return newObject;
      })
      reducedDataArray.push(objects)
    }
    return reducedDataArray
  }

  updateSummaryState = (shipping) => {
    const updatedData = this.filterAndReduce();

    const {discount} = this.state;

    let data = updatedData;
    if (!data.length) {data = []};

    const itemQuantity = data.reduce(function(previousValue, currentValue) {
      const quantity = (previousValue * 1) + (currentValue.quantity * 1);
      return ( quantity );
    }, initQuantityValue);

    const subTotal = data.reduce(function(previousValue, currentValue) {
      const value = ((previousValue * 1) + (currentValue.total * 1)).toFixed(2);
      return ( value );
    }, initQuantityValue);

    let cartTotal = ((subTotal * 1) + (this.updateShippAndHandle(shipping) * 1) - (discount * 1)).toFixed(2);
    if (cartTotal < 0) { cartTotal = 0 }

    this.setState({ quantity: itemQuantity, shippAndHandle: this.updateShippAndHandle(shipping), cartSub: subTotal, cartTotal: cartTotal === '0.00' ? cartTotal = 0 : cartTotal });

    this.props.grabUpdate(this.updateSummaryState);
    this.props.updateSummaryState(this.onClickChangeStateFromContent);
    this.props.grabCartTotal(cartTotal);
    this.props.resetSummaryState(this.resetState)
  }

  updateShippAndHandle = (shipping) => {
    const {cartSub} = this.state;
    let x = 0;
    if ( shipping === 'standard' && cartSub >= 40 ) {
      return x
    } else if (shipping === 'standard' && cartSub < 40) {
      x = 3;
      return x
    } else if (shipping === 'express') {
      x = 5
      return x
    } else {
      return x
    }
  }

  onClickRemove = (e) => {
    const value = e.target.value;
    const dataContent = this.props.dataPass;
    const dataSummary = this.props.dataGrab;
    for (let objectIndex in dataContent) {
      if (dataContent[objectIndex].product.productKeyName === value) {
        dataContent.splice(objectIndex, 1);
        break;
      }
    }
    let {promo, quantity} = this.state;
    if (promo !== 0 && quantity <= 1) {
      this.setState({ discount: 0, cartTotal: 0, })
    }
    dataSummary(dataContent)
    this.updateSummaryState();
  }

  onClickCartButton = () => {
    const {quantity} = this.state
    if (quantity !== 0) {
      this.props.updateLoad(delivery)
    }
  }

  onClickPromoButton = () => {
    const promoCode = 'SLIME'
    let {promo, cartSub, shippAndHandle, quantity, discount} = this.state;
    if (promo === promoCode && quantity !== 0) {
      discount = 5;
    }
    const total = (cartSub + shippAndHandle - discount).toFixed(2);
    if (promo === promoCode && quantity !== 0) {
      this.setState ({ discount: 5, cartTotal: total});
    }
  }

  onClickPromoInput = () => {
    alert('use code SLIME for $5 off!')
  }

  onClickGoToCheckout = () => {
    this.props.passCheckoutFunction()
    if (this.props.passCheckoutFunction()) {
      this.props.updateLoad(payment)
    }
  }

  onClickGoToConfirmation = () => {
    this.props.passPaymentFunction()
    if (this.props.passPaymentFunction()) {
      this.props.updateLoad(confirmation)
    }
  }

  onChangePromoInput = (e) => {
    const value = e.target.value;
    this.setState({ promo: value })
  }

  itemMessage = (quantity) => {
    return `${quantity} items in your bag`;
  }

  capitalizeFirst = (x) => {
    return x[0].toUpperCase().concat(x.slice(x.length - x.length + 1))
  }

  mask = (cardNumber) => {
    const regExp = /[0-9](?=.*.{4})/g
    const maskedNumber = cardNumber.replace(regExp, 'X');
    return maskedNumber;
  }

  render() {
    const load = this.props.loadState;

    const updatedData = this.filterAndReduce();

    const {quantity, cartSub, shippAndHandle, discount, cartTotal} = this.state;

    const {address, addressTitle, city, country, fullName, phoneAreaCode, phoneNumber, radioButtons, state, zipCode} = this.props.passShippingInfo;

    const {cardNumber, cardType} = this.props.passPaymentInfo;

    let data = updatedData;
    if (!data.length) {data = []};

    const totalBoxInfo = [
      {keyName: 'cartSub', name: 'Cart Subtotal', value: cartSub, classes: styles.cartSub},
      {keyName: 'shipAndHandle', name: 'Shipping & Handling', value: shippAndHandle, classes: styles.shippAndHandle},
      {keyName: 'discount', name: 'Discount', value: discount, classes: styles.discount},
      {keyName: 'cartTotal', name: 'Cart Total', value: cartTotal, classes: styles.cartTotal},
    ];

    const emptyMessage = 'Your cart\'s empty... BUY SOMETHING!';

    return(
      <div onLoad={this.updateSummaryState} className={styles.summaryContainer}>
        <h2>Summary</h2>
        {load === cart ? 
          <div>
            <hr />
            <h3 className={styles.promoHeader}>Do you have a promo code?</h3>
            <div className={styles.promoContainer}>
              <label htmlFor="promo">
                <input onClick={this.onClickPromoInput} onChange={this.onChangePromoInput} className={styles.promoInput} type="promo" name="promo" placeholder="CODE"/>
              </label>
              <button onClick={this.onClickPromoButton} className={styles.promoButton}>Apply</button>
            </div>
          </div>
        : null}
        <hr />
        <div className={styles.itemCountingBox}>
          { !data.length ? this.itemMessage(initQuantityValue) :  this.itemMessage(quantity) }
        </div>
        <hr />
        { data.length ? data.map((item, index) => {
          const { product } = item;
          const {productKeyName: keyName} = product;
          return (
            <CartSummaryContent 
              loadState={load} 
              data={item}
              onClick={this.onClickRemove}
              className={styles.contentContainer} 
              key={`${keyName}${index}`}
            />
          )
        }) : <div className={styles.emptyMessage}>{emptyMessage}</div>}
        <hr />
        <div className={styles.totalBox}>
          {totalBoxInfo.map((item, index) => {
            const {keyName, name, value, classes} = item
            return (
              <div key={`${keyName}${index}`} className={`${styles.totalIndividualBoxes}`}>
                <ul>
                  <li>{name}</li>
                </ul>
                <ul className={classes}>
                  <li>{
                    name === 'Shipping & Handling' 
                    ? <>{shippAndHandle !== 0 ? <span className={styles.plusSign}>+</span> : null} ${value}</> 
                    : name === 'Discount' 
                      ? <>{discount !== 0 ? <span className={styles.minusSign}>-</span> : null} ${value}</> 
                      : <>${value}</>
                  }</li>
                </ul>
              </div>
            )
          })}
        </div>
        { this.props.passShippingInfo !== '' ?
          <div className={styles.totalBox}>
            <hr />
            <div>
              <h3>SHIPPING INFORMATION</h3>
              <ul>
                <li>{`Address Title: ${addressTitle}`}</li>
                <li>{`Recipient: ${fullName}`}</li>
                <li>{`Phone Number: (${phoneAreaCode}) ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(phoneNumber.length - 4)}`}</li>
                <li>{`Country: ${country.toUpperCase()}`}</li>
                <li>{`Address: ${address}, ${this.capitalizeFirst(city)}, ${this.capitalizeFirst(state)}, ${zipCode}`}</li>
              </ul>
            </div>
            <hr />
            <div>
              <h3>SHIPPING METHOD</h3>
              <ul>
                <li><strong>{radioButtons.toUpperCase()}</strong></li>
                <li>{radioButtons === 'standard' ? 'Delivery in 4-6 Business Days' : 'Delivery in 1-3 Business Days'}</li>
              </ul>
            </div>
          </div>
          : null
        }
        <hr />
        {load === cart ? <button onClick={this.onClickCartButton} className={styles.shippingButton}>Proceed To Shipping</button> : null}
        {load === delivery ? <button onClick={this.onClickGoToCheckout} className={styles.checkoutButton}>Proceed To Checkout</button> : null}
        {load === payment ? <button onClick={this.onClickGoToConfirmation} className={styles.payButton}>Pay ${cartTotal}</button> : null}
        {load === confirmation ? 
          (
            <div className={styles.totalBox}>
              <h3>PAYMENT METHOD</h3>
              <ul>
                <li>
                  <strong>{cardType}</strong>
                </li>
                <li>{`Total payment: $${cartTotal}`}</li>
                <li>{`Card Number: ${this.mask(cardNumber)}`}</li>
              </ul>
            </div>
          )
        : null}
      </div>
    )
  }
}

export default CartSummary;
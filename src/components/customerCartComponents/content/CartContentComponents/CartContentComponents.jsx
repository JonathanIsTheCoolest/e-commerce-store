import React from 'react';
import styles from '../CartContent/CartContent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const faCartPlusIcon = <FontAwesomeIcon icon={faCartPlus}/>

let productInfoArray = [];

class CartContentComponents extends React.Component{
  constructor(props) {
    super(props)
    this.state = { 
      totalPrice: props.productInformation.productPrice,
      quantity: 1, 
    };
  }

  onChangeQuantitySelector = (e) => {
    const { productPrice } = this.props.productInformation;
    const value = e.target.value;
    const totalPrice = (value * productPrice).toFixed(2);
    this.setState({ 
      totalPrice: totalPrice,
      quantity: value, 
    })
  }

  grabSummaryContent = (content) => {
    productInfoArray = content;
  }

  onClickAddToCart = () => {
    const {totalPrice, quantity} = this.state;
    const productInfo = {
      product: this.props.productInformation,
      total: totalPrice,
      quantity: quantity,
    }
    if (quantity > 1) {
      for (let i = 0; i < quantity; i++) {
        const separateProducts = {
          product: this.props.productInformation,
          total: this.props.productInformation.productPrice,
          quantity: 1,
        }
        productInfoArray.push(separateProducts)
      }
    } else {
      productInfoArray.push(productInfo)
    }
    this.props.dataGrab(productInfoArray);
    this.props.passUpdate();
  }

  render() {
    const { totalPrice } = this.state
    const { productImage, productKeyName, productName, productPrice } = this.props.productInformation;
    const optionsArray = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
    return(
      <div  className={styles.cartContentContainer}>
      <div className={styles.listContainer}>
        <ul className={styles.listOne}>
          <li>
            <div className={styles.productImageContainer}>
              <img src={productImage} alt={productName} />
            </div>
            <div className={styles.productDescription}>
              {productName}
            </div>
          </li>
        </ul>
        <ul className={styles.listTwo}>
          <li>${productPrice}</li>
          <li className={styles.marginRightQuantity}>
            <label htmlFor={productKeyName}>
              <select onChange={this.onChangeQuantitySelector} name="quantity" id={productKeyName}>
                {optionsArray.map((item, index) => (
                  <option key={`${item}${index}`} value={index + 1}>{index + 1}</option>
                ))}
              </select>
            </label>
          </li>
          <li>{`$${totalPrice}`}</li>
        </ul>
        <button onClick={this.onClickAddToCart} className={styles.addItem}>Add To Cart {faCartPlusIcon}</button>
      </div>
      <hr />
    </div>
    )
  }
}

export default CartContentComponents;
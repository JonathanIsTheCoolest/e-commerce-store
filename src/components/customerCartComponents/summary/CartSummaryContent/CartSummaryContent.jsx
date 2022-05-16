import React from 'react';
import styles from '../CartSummary/CartSummary.module.css';

const cart = 'cart';

class CartSummaryContent extends React.Component {
  render() {
    const { product, quantity, total } = this.props.data;
    const loadState = this.props.loadState
    const { productImage: image, productKeyName: keyName, productName: name, productPrice: price } = product;
    return (
      <div >
        <div className={styles.productContentContainer}>
          <div className={styles.imageContainer}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.infoContainer}>
            <ul>
              <li>{name}</li>
              <li>Price: ${price}</li>
              <li>Quantity: {quantity}</li>
              <li>Total: ${total}</li>
            </ul>
          </div>
        </div>
        {loadState === cart ?
          <button value={keyName} onClick={this.props.onClick} className={styles.removeButton}>Remove From Cart</button>
          : null
        }
      </div>
    )
  }
}

export default CartSummaryContent;
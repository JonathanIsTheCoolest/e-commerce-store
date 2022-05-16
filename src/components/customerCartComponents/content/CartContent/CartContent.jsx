import React from 'react';
import CartContentComponents from '../CartContentComponents/CartContentComponents';
import styles from './CartContent.module.css';
import blueBerryWaffle from '../assets/blueBerryWaffle.png';
import cottonCandy from '../assets/cottonCandy.png';
import fruityPebbles from '../assets/fruityPebbles.png';
import mintChip from '../assets/mintChip.png';
import peachesAndCream from '../assets/peachesAndCream.png';


class CartContent extends React.Component {
  render() {
    const productContentArray = [
      { productImage: blueBerryWaffle, productKeyName: 'blueberryWaffle', productName: 'Blueberry Waffle Slime', productPrice: '17.99' },
      { productImage: cottonCandy, productKeyName: 'cottonCandy', productName: 'Cotton Candy Slime', productPrice: '15.99' },
      { productImage: fruityPebbles, productKeyName: 'fruityPebbles', productName: 'Fruity Pebbles Slime', productPrice: '19.99' },
      { productImage: mintChip, productKeyName: 'mintChip', productName: 'Mint Chip Slime', productPrice: '15.99' },
      { productImage: peachesAndCream, productKeyName: 'peachesAndCream', productName: 'Peaches And Cream Slime', productPrice: '17.99' },
    ]
    return (
      <div className={styles.cartContentContainer}>
        <div className={styles.listContainer}>
          <ul className={styles.listOne}>
            <li>SLIMES</li>
          </ul>
          <ul className={styles.listTwo}>
            <li>PRICE</li>
            <li>QUANTITY</li>
            <li>TOTAL PRICE</li>
          </ul>
        </div>
        <hr />
        <div className={styles.componentContainer}>
          { productContentArray.length ? productContentArray.map((item, index) => (
              <CartContentComponents key={`${item.productKeyName}${index}`} productInformation={item} dataGrab={this.props.dataGrab} passUpdate={this.props.passUpdate}/>
          )) : null 
          }
        </div>
      </div>
    )
  }
}

export default CartContent;
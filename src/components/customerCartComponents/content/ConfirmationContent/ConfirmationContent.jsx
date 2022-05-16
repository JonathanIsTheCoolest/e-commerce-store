import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './ConfirmationContent.module.css'

const cart = 'cart'

class ConfirmationContent extends React.Component {

  onClickBackToCart = () => {
    this.props.updateLoad(cart)
    this.props.resetState();
  }

  render() {
    return (
      <div className={styles.confirmationBox}>
        <h2>Confirmation</h2>
        <hr />
        <FontAwesomeIcon icon={faCircleCheck} className={styles.circleCheckIcon} />
        <h3>Congratulations.
          <br />
          Your order has been accepted.
        </h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum aut aspernatur, voluptatem asperiores quibusdam qui pariatur illum quia nulla dignissimos aperiam nesciunt et placeat ullam, eligendi enim nobis a eius.
        </p>
        <button className={styles.trackButton}>Track Order</button>
        <br />
        <button onClick={this.onClickBackToCart} className={styles.homeButton}>Back To Home Page</button>
      </div>
    )
  }
}

export default ConfirmationContent;
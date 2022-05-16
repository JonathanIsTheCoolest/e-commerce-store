import React from 'react';
import CartContent from '../CartContent/CartContent';
import ShippingContent from '../ShippingContent/ShippingContent';
import PaymentContent from '../PaymentContent/PaymentContent';
import ConfirmationContent from '../ConfirmationContent/ConfirmationContent';
import styles from './ContentContainer.module.css'

const cart = 'cart';
const delivery = 'delivery';
const payment = 'payment';
const confirmation = 'confirmation';

class ContentContainer extends React.Component {

  render() {
    const loadState = this.props.loadState;
    return (
      <div className={styles.contentBoxContainer}>
        {loadState === cart ? 
          <CartContent 
            dataGrab={this.props.dataGrab} 
            passUpdate={this.props.passUpdate}
          />
        : null}
        {loadState === delivery ? 
          <ShippingContent 
            passUpdate={this.props.passUpdate}
            updateLoad={this.props.updateLoad} 
            updateSummaryState={this.props.updateSummaryState}
            grabCheckoutFunction={this.props.grabCheckoutFunction}
          /> 
        : null}
        {loadState === payment ? 
          <PaymentContent 
            passUpdate={this.props.passUpdate}
            passCartTotal={this.props.passCartTotal}
            updateLoad={this.props.updateLoad} 
            updateSummaryState={this.props.updateSummaryState}
            grabPaymentFunction={this.props.grabPaymentFunction}
          /> 
        : null}
        {loadState === confirmation ? 
          <ConfirmationContent
            updateLoad={this.props.updateLoad} 
            resetState={this.props.resetState}
          /> 
        : null}
      </div>
    )
  }
}

export default ContentContainer;
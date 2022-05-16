import React from 'react';
import ContentContainer from '../content/ContentContainer/ContentContainer';
import CartSummary from '../summary/CartSummary/CartSummary';
import styles from './CustomerCart.module.css';
import pTwoStyles from './ProgressTwo.module.css';
import pThreeStyles from './ProgressThree.module.css';
import pFourStyles from './ProgressFour.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCartShopping, faTruck, faCreditCard, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const checkIcon = <FontAwesomeIcon icon={faCheck} className={styles.progressIcons}/>;
const cartIcon = <FontAwesomeIcon icon={faCartShopping} className={styles.progressIcons}/>
const truckIcon = <FontAwesomeIcon icon={faTruck} className={styles.progressIcons}/>
const creditCardIcon = <FontAwesomeIcon icon={faCreditCard} className={styles.progressIcons}/>
const circleCheckIcon = <FontAwesomeIcon icon={faCircleCheck} className={styles.progressIcons}/>

const progressStyleStateBuilder = (styleSheet) => {
  const progressStyles = {
    cartOne: styleSheet.cart,
    cartTwo: styleSheet.cartTwo,
    deliveryOne: styleSheet.delivery,
    deliveryTwo: styleSheet.deliveryTwo,
    paymentOne: styleSheet.payment,
    paymentTwo: styleSheet.paymentTwo,
    confirmationOne: styleSheet.confirmation,
    confirmationTwo: styleSheet.confirmationTwo,
  }
  return progressStyles;
}

const progressStylesOne = progressStyleStateBuilder(styles);
const progressStylesTwo = progressStyleStateBuilder(pTwoStyles);
const progressStylesThree = progressStyleStateBuilder(pThreeStyles);
const progressStylesFour = progressStyleStateBuilder(pFourStyles);

const cart = 'cart';
const delivery = 'delivery';
const payment = 'payment';
const confirmation = 'confirmation';

const INIT_STATE = {
  load: cart,
  progressBox: { 
    progressOne: cartIcon,
    progressTwo: truckIcon,
    progressThree: creditCardIcon, 
    progressFour: circleCheckIcon,
  },
  progressStyles: progressStylesOne,
  cartInfo: '',
  shippingInfo: '',
  paymentInfo: '',
  cartTotal: 0,
}

class CustomerCart extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      ...INIT_STATE, 
      updateFunction: this.grabUpdateFunction,
      updateSummaryState: this.grabUpdateSummaryState,
      onCheckout: this.grabCheckoutFunction,
      onPayment: this.grabPaymentFunction,
      resetSummaryState: this.resetSummaryState,
    };
  }

  progressBoxUpdate = (load) => {
    if (load === cart) {
      this.setState({
        progressBox: { progressOne: cartIcon, progressTwo: truckIcon, progressThree: creditCardIcon, progressFour: circleCheckIcon},
        progressStyles: progressStylesOne,
      })
    } else if (load === delivery) {
      this.setState({
        progressBox: { progressOne: checkIcon, progressTwo: truckIcon, progressThree: creditCardIcon, progressFour: circleCheckIcon},
        progressStyles: progressStylesTwo,
      })
    } else if (load === payment) {
      this.setState({
        progressBox: { progressOne: checkIcon, progressTwo: checkIcon, progressThree: creditCardIcon, progressFour: circleCheckIcon},
        progressStyles: progressStylesThree,
      })
    } else if (load === confirmation) {
      this.setState({
        progressBox: { progressOne: checkIcon, progressTwo: checkIcon, progressThree: checkIcon, progressFour: circleCheckIcon},
        progressStyles: progressStylesFour 
      })
    }
  }

  resetState = () => {
    this.setState({
      ...INIT_STATE, 
      updateFunction: this.grabUpdateFunction,
      updateSummaryState: this.grabUpdateSummaryState,
      onCheckout: this.grabCheckoutFunction,
      onPayment: this.grabPaymentFunction,
    })
    this.state.resetSummaryState();
  }

  resetSummaryState = (func) => {
    this.setState({ resetSummaryState: func })
  }

  cartContentDataGrabber = (content) => {
    this.setState({ cartInfo: content })
  }

  grabCartTotal = (cartTotal) => {
    this.setState({ cartTotal: cartTotal })
  }

  grabUpdateFunction = (func) => {
    this.setState({ updateFunction: func })
  }

  grabUpdateLoad = (loadState) => {
    this.setState({ load: loadState })
    this.progressBoxUpdate(loadState);
  }

  grabUpdateSummaryState = (func) => {
    this.setState({ updateSummaryState: func })
  }

  grabCheckoutFunction = (func, info) => {
    this.setState({ onCheckout: func, shippingInfo: info })
  }

  grabPaymentFunction = (func, info) => {
    this.setState({ onPayment: func, paymentInfo: info })
  }

  render() {
    const {progressOne, progressTwo, progressThree, progressFour} = this.state.progressBox;
    const {cartOne, cartTwo, deliveryOne, deliveryTwo, paymentOne, paymentTwo, confirmationOne, confirmationTwo} = this.state.progressStyles;
    const dataArrayProgress = [      
      {name: 'Cart', logo: progressOne, firstCircleClass: cartOne, secondCircleClass: cartTwo},
      {name: 'Delivery', logo: progressTwo, firstCircleClass: deliveryOne, secondCircleClass: deliveryTwo},
      {name: 'Payment', logo: progressThree, firstCircleClass: paymentOne, secondCircleClass: paymentTwo},
      {name: 'Confirmation', logo: progressFour, firstCircleClass: confirmationOne, secondCircleClass: confirmationTwo},
    ];
    return (
      <div className={styles.boxContainer}>
        <div className={`${styles.progressBox} ${styles.allBoxes}`}>
          {dataArrayProgress.map((item, index) => 
          <div key={`${item.name}${index}`} className={styles.progressMarkers}>
            <div className={`${styles.circles} ${item.firstCircleClass}`}>
              {item.logo}
              <div className={`${styles.circleTwo} ${item.secondCircleClass}`}></div>
            </div>
            <div className={styles.progressName}>{item.name}</div>
          </div>
          )}
        </div>
        <div className={this.state.load === payment ? `${styles.contentBox} ${styles.extraMarginBottom} ${styles.allBoxes}` : `${styles.contentBox} ${styles.allBoxes}`}>
          <ContentContainer 
            dataGrab={this.cartContentDataGrabber} 
            passUpdate={this.state.updateFunction} 
            loadState={this.state.load} 
            updateSummaryState={this.state.updateSummaryState} 
            updateLoad={this.grabUpdateLoad}
            grabCheckoutState={this.grabCheckoutState}
            grabCheckoutFunction={this.grabCheckoutFunction}
            grabPaymentFunction={this.grabPaymentFunction}
            passCartTotal={this.state.cartTotal}
            resetState={this.resetState}
          />
        </div>
        <div className={`${styles.summaryBox} ${styles.allBoxes}`}>
          <CartSummary 
            dataPass={this.state.cartInfo} 
            loadState={this.state.load} 
            dataGrab={this.cartContentDataGrabber} 
            grabUpdate={this.grabUpdateFunction} 
            updateSummaryState={this.grabUpdateSummaryState} 
            updateLoad={this.grabUpdateLoad}
            passCheckoutFunction={this.state.onCheckout}
            passPaymentFunction={this.state.onPayment}
            passShippingInfo={this.state.shippingInfo}
            passPaymentInfo={this.state.paymentInfo}
            grabCartTotal={this.grabCartTotal}
            resetSummaryState={this.resetSummaryState}
          />
        </div>
      </div>
    )
  }
}

export default CustomerCart;
import React from 'react';
import SignupLogin from '../SignupLogin/SignupLogin';
import CustomerCart from '../customerCartComponents/CustomerCart/CustomerCart'

const signupLogin = 'signupLogin';
const customerCart = 'customerCart';

class LoadComponents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loadComponent: signupLogin }
  }

  getLoadComponents = (loadComponent) => {
    this.setState({ loadComponent: loadComponent })
  }

  render() {
    const { loadComponent } = this.state;
    return(
      <div>
        { 
        (loadComponent === signupLogin ? <SignupLogin parentCallBack={this.getLoadComponents}/> : null ) ||
        (loadComponent === customerCart ? <CustomerCart parentCallBack={this.getLoadComponents}/> : null )
         }
      </div>
    )
  }
}

export default LoadComponents;
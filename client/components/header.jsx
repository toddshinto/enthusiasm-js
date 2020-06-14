import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="wicked-header">
        <div className="logo">
          <h5>Wicked Sales</h5>
          <i className="fas fa-theater-masks icon" />
        </div>
        <div className="cart-and-count">
          <i className="fas fa-shopping-cart cart" onClick={() => this.props.setView('cart', {})} />
          <div className="cart-num" onClick={() => this.props.setView('cart', {})}>
            {this.props.cart.length}
          </div>
        </div>
      </div>
    );
  }
}

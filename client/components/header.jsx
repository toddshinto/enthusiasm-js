import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="wicked-header">
        <h5 className="">Wicked Sales</h5>
        <i className="fas fa-theater-masks icon" />
        <i className="fas fa-shopping-cart ml-auto pr-1 cart"
          onClick={() => this.props.setView('cart', {})}></i>
        <div className="cart-num" onClick={() => this.props.setView('cart', {})}>
          {this.props.cart.length}
        </div>
      </div>
    );
  }
}

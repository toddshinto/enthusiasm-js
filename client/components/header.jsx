import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="wicked-header">
        <h5 className="">Wicked Sales</h5>
        <i className="fas fa-theater-masks icon" />
        <i className="fas fa-shopping-cart ml-auto pr-3 cart"></i>
        <div className="cart-num">{this.props.cart.length}</div>
      </div>
    );
  }
}

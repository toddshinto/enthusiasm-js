import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartItems = this.props.cartItems;
    const prices = [...cartItems.price].reduce((x, y) => x + y);
    return (
      <>
        <h1>Your Cart</h1>
        {cartItems.map(item =>
          <CartSummaryItem key={cartItems.indexOf(item)} />)}
        <h3>Total Price {prices} </h3>
      </>
    );
  }
}

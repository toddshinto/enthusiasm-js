import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    const cartItems = this.props.cartItems;
    let prices;
    let total;
    if (cartItems.length > 0) {
      prices = cartItems.reduce((x, y) => (x + Number(y.price)), 0);
      total = Number((prices / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      total = 'N/A';
    }
    return (
      <>
        <div className="row">
          <button className="btn btn-link back" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
        </div>
        <h1>Your Cart</h1>
        {cartItems.map(item =>
          <CartSummaryItem key={cartItems.indexOf(item)} item={item}/>)}
        <h3>Total: {total} </h3>
        <button type="button" onClick={() => this.props.setView('checkout', {})}>Checkout</button>
      </>
    );
  }
}

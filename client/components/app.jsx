import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import OrderSuccess from './order-success';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        const newCart = [...this.state.cart, data];
        return newCart;
      })
      .then(newCart => this.setState({ cart: newCart }));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data[0].orderId) {
          this.setState({ cart: [], view: { name: 'order-success', params: {} } });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  render() {
    const view = this.state.view.name;
    let component = null;
    switch (view) {
      case 'order-success':
        component = <OrderSuccess
          setView={this.setView} />;
        break;
      case 'details':
        component = <ProductDetails
          setView={this.setView}
          addToCart={this.addToCart}
          params={this.state.view.params} />;
        break;
      case 'cart':
        component = <CartSummary
          cartItems={this.state.cart}
          setView={this.setView} />;
        break;
      case 'checkout':
        component = <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          cartItems={this.state.cart} />;
        break;
      default:
        component = <ProductList
          setView={this.setView} />;
        break;
    }
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <div className="container">
        <Header cart={this.state.cart} setView={this.setView}/>
        {component}
      </div>;
  }
}

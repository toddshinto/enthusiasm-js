import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

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
        this.setState({ cart: [], view: { name: 'catalog', params: {} } });
        // eslint-disable-next-line no-console
        console.log(data);
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
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <div className="container">
        <Header cart={this.state.cart} setView={this.setView}/>
        { view === 'catalog' ? <ProductList setView={this.setView}/>
          : view === 'details' ? <ProductDetails
            setView={this.setView}
            addToCart={this.addToCart}
            params={this.state.view.params} />
            : view === 'cart' ? <CartSummary
              cartItems={this.state.cart}
              setView={this.setView} />
              : <CheckoutForm placeOrder={this.placeOrder}/>
        }
      </div>;
  }
}

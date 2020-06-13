import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
    fetch(`/api/cart${product}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        const newCart = [];
        for (const i in this.state.cart) {
          newCart.push(this.state.cart[i]);
        }
        return newCart;
      })
      .then(newCart => this.setState({ cart: newCart }));
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
        <Header cart={this.state.cart} />
        {view === 'catalog'
          ? <ProductList setView={this.setView}/>
          : <ProductDetails setView={this.setView} params={this.state.view.params} />
        }
      </div>;
  }
}

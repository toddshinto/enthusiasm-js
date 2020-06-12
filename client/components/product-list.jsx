import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    const products = this.state.products;
    return (
      products.map(product =>
        <ProductListItem key={products.indexOf(product)} product={product}/>)
    );
  }
}

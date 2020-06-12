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

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    const products = this.state.products;
    return (
      <div className="card-deck">
        {products.map(product =>
          <ProductListItem key={products.indexOf(product)} product={product}/>)}
      </div>
    );
  }
}

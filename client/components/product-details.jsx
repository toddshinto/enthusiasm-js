import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('api/products/' + 'productId')
      .then(response => response.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    const product = this.state.product;
    const price = product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return this.state.product
      ? <div>
        <div>
          <img src={product.image} />
          <div className="card">
            <div className="card-title">
              <h3>{product.name}</h3>
              <h5 className="text-secondary">{price}</h5>
              <p className="card-text">{product.shortDescription}</p>
            </div>
          </div>
        </div>
        <div>
          <p>{product.longDescription}</p>
        </div>
      </div>
      : <></>;
  }
}

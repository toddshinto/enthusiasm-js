import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const product = this.props.product;
    const price = Number((product.price / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="col-4 mb-3" onClick={() => this.props.setView('details', { productId: product.productId })}>
        <div className="card shadow-sm">
          <img className="card-img-top" src={product.image} style={{ height: 250, objectFit: 'contain' }}/>
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <h6 className="card-subtitle text-secondary">{price}</h6>
            <p className="card-text mt-1">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

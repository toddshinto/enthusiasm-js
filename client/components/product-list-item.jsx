import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const product = this.props.product;
    const price = Number((product.price / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="col-4 mb-3" >
        <div className="card h-100 shadow-sm">
          <img className="card-img-top" onClick={() => this.props.setView('details', { productId: product.productId })} src={product.image} style={{ height: 250, objectFit: 'contain', cursor: 'pointer' }}/>
          <div className="card-body">
            <h3 className="card-title" onClick={() => this.props.setView('details', { productId: product.productId })} style={{ cursor: 'pointer' }}>{product.name}</h3>
            <h6 className="card-subtitle text-secondary">{price}</h6>
            <p className="card-text mt-1">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

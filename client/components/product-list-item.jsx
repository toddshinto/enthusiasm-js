import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const price = this.props.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.product.image} />
        <div className="card-body">
          <h5 className="card-title">{this.props.product.name}</h5>
          <h5 className="card-subtitle">{price}</h5>
          <p className="card-text">{this.props.product.shortDescription}</p>
        </div>
      </div>
    );
  }
}

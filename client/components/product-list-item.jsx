import React from 'react';

export default class ProductList extends React.Component {
  render() {
    const price = this.props.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.image} />
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <h5 className="card-subtitle">{price}</h5>
          <p className="card-text">{this.props.shortDescription}</p>
        </div>
      </div>
    );
  }
}

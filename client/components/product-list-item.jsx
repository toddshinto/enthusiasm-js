import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const product = this.props.product;
    const hovered = this.state.hovered;
    const price = Number((product.price / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="col-md-4 mb-3 product" >
        <div className="card h-100 grey-shadow"
          onClick={() => this.props.setView('details', { productId: product.productId })}
          style={{ cursor: 'pointer' }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <img className="card-img-top" src={product.image} style={{ height: 250, objectFit: 'contain', cursor: 'pointer' }}/>
          <div className="card-body">
            <h5 className={`card-title ${hovered ? 'text-primary' : ''}`}>{product.name}</h5>
            <h6 className="card-subtitle text-secondary">{price}</h6>
            <p className="card-text mt-1">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

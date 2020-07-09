import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/' + this.props.params.productId)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product) {
      const product = this.state.product;
      const price = Number((product.price / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return (
        <div className="p-3 shadow-sm">
          <div className="row back-row">
            <button className="btn btn-link back" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
          </div>
          <div className="row" >
            <img src={product.image} className="col-sm-12 col-md-6 details-img" style={{ cursor: 'pointer' }}/>
            <div className="col-sm-12 col-md-6">
              <div className="col">
                <h3>{product.name}</h3>
                <h5 className="text-secondary">{price}</h5>
                <button type="button" className="btn btn-dark mt-1 cust-btn" onClick={() => this.props.addToCart(product)}>Add to Cart</button>
                <p className="card-text mt-3">{product.shortDescription}</p>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <p>{product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

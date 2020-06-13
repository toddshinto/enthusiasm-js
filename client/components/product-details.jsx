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
      const price = product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return (
        <div className="p-3 shadow-sm">
          <div className="row">
            <button className="btn btn-link" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
          </div>
          <div className="row" >
            <img src={product.image} className="col-6 details-img"/>
            <div className="col-6">
              <div className="col">
                <h3>{product.name}</h3>
                <h5 className="text-secondary">{price}</h5>
                <p className="card-text">{product.shortDescription}</p>
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
import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const item = this.props.item;
    const price = Number((item.price / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="shadow-sm row">
        <div className="col-sm-12 col-md-3 text-center">
          <img src={item.image} className='summary-img'></img>
        </div>
        <div className="summary-desc col-sm-12 col-md-6 pb-3">
          <h3>{item.name}</h3>
          <h5 className='text-secondary'>{price}</h5>
          <p>{item.shortDescription}</p>
        </div>
      </div>
    );
  }
}

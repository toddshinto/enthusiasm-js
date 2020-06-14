import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div>
        <div>
          {item.image}
        </div>
        <div>
          <h3>{item.name}</h3>
          <h5>{item.price}</h5>
          <p>{item.shortDescription}</p>
        </div>
      </div>
    );
  }
}

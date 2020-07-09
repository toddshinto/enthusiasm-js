import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('cart', {});
  }

  render() {
    const length = this.props.cart.length;
    return (
      <div className="enth-header">
        <div className="logo">
          <h5>Enthusiasm</h5>
          <i className="fas fa-theater-masks icon" />
        </div>
        {this.props.view.name === 'demo'
          ? <></>
          : <div className="cart-and-count" >
            <i className="fas fa-shopping-cart cart" onClick={this.handleClick} />
            <div className={`cart-num ${length > 9 ? 'med-num' : ''} ${length < 99 ? '' : 'big-num'}`} onClick={this.handleClick}>
              {length < 99 ? length : '99+'}
            </div>
          </div>}
      </div>
    );
  }
}

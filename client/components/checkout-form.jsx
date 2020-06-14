import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChangeCC(event) {
    const num = /^[0-9\b]+$/;
    if (event.target.value === '' || num.test(event.target.value)) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderInfo = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderInfo);
    this.handleReset();
  }

  handleReset() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    const cartItems = this.props.cartItems;
    let prices;
    let total;
    if (cartItems.length > 0) {
      prices = cartItems.reduce((x, y) => (x + Number(y.price)), 0);
      total = Number((prices / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      total = 'N/A';
    }
    return (
      <div className="container">
        <h3>Checkout</h3>
        <div className="row">
          <button className="btn btn-link back" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
        </div>
        <form onSubmit={this.handleSubmit} className="col-7 pt-3 pb-5 pl-3 pr-3 rounded shadow-sm">
          <h5 className="mb-3">Total: {total}</h5>
          <div className="form-group">
            <label htmlFor="name" className="col-3">Name</label>
            <input type="text" className="col-9" name="name" id="name" onChange={this.handleChange} value={this.state.name} placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard" className="col-3">Credit Card</label>
            <input type="text" className="col-9" name="creditCard" id="creditCard" onChange={this.handleChangeCC} value={this.state.creditCard} placeholder="0000 0000 0000 0000"></input>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress" className="col-3">Shipping Address</label>
            <textarea name="shippingAddress" className="col-9" id="shippingAddress" onChange={this.handleChange} value={this.state.shippingAddress} placeholder="Shipping Address"></textarea>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button type="submit" className="btn btn-dark mr-3">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

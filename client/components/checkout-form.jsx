import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      ccBlur: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    this.setState({ ccBlur: true });
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

  validate(creditCard) {
    return creditCard.length === 16;
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
    const validated = this.validate(this.state.creditCard);
    const touched = (this.state.ccBlur && !validated);
    let prices;
    let total;
    if (cartItems.length > 0) {
      prices = cartItems.reduce((x, y) => (x + Number(y.price)), 0);
      total = Number((prices / 100).toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      total = 'N/A';
    }
    return (
      <div className="container ckout-container">
        <h3>Checkout</h3>
        <div className="row back-row">
          <button className="btn btn-link back" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
        </div>
        <form onSubmit={this.handleSubmit} className="col pt-3 pb-5 pl-3 pr-3 rounded shadow-sm ckout-form">
          <h5 className="mb-3">Total: {total}</h5>
          <div className="row ml-3 text-danger">Do not enter personal information!</div>
          <div className="form-group col-12 col-xs-4">
            <label htmlFor="name">
              Name
            </label>
            <div>
              <input
                className="col-12"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Name"
                required />
            </div>
          </div>
          <div className="form-group col-12">
            <label htmlFor="creditCard">
              Credit Card
            </label>
            <div>
              <input
                className="col-12"
                type="text"
                name="creditCard"
                id="creditCard"
                onBlur={this.handleBlur}
                maxLength={16}
                onChange={this.handleChangeCC}
                value={this.state.creditCard}
                placeholder="0000 0000 0000 0000"
                required />
            </div>
            {touched ? <p className="text-right w-100 text-danger">16 digits required!</p> : <></>}
          </div>
          <div className="form-group col-12">
            <label htmlFor="shippingAddress">
              Shipping Address
            </label>
            <div>
              <textarea
                className="col-12"
                name="shippingAddress"
                id="shippingAddress"
                onChange={this.handleChange}
                value={this.state.shippingAddress}
                placeholder="Shipping Address"
                required />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button
              type="submit"
              className={`btn btn-dark mr-3 cust-btn ${validated ? '' : 'error'}`}
              disabled={!validated ? 'disabled' : ''}
            >Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

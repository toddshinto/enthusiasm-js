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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
    return (
      <div className="container">
        <h3>My Cart</h3>
        <h5></h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={this.handleChange} placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input type="text" name="creditCard" id="creditCard" onChange={this.handleChange} placeholder="0000 0000 0000 0000"></input>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea name="shippingAddress" id="shippingAddress" onChange={this.handleChange} placeholder="Shipping Address"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

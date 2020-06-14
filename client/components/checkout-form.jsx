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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} placeholder="Name"></input>
          <input type="text" name="creditCard" onChange={this.handleChange} placeholder="0000 0000 0000 0000"></input>
          <textarea name="shippingAddress" onChange={this.handleChange} placeholder="Shipping Address"></textarea>
        </form>
      </div>
    );
  }
}

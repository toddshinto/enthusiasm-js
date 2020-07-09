import React from 'react';

export default class OrderSuccess extends React.Component {
  render() {
    return (
      <div className="col shadow-sm rounded p-4">
        <h3><i className="fas fa-check-circle text-success" /> Order Successfully Placed! </h3>
        <div className="row back-row">
          <button className="btn btn-link back" onClick={() => this.props.setView('catalog', {})}>{'<'} Back to catalog</button>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class DemoModal extends React.Component {
  render() {
    return (
      <div className="col">
        <h3 className="text-primary">Attention:</h3>
        <h5 className="text-secondary">This website is a demonstration.  These products are not actually for sale.</h5>
        <h5 className="text-secondary">Please do not enter any personal information.  I don%apost want it.</h5>
        <button type="button" className="btn btn-dark mt-1 cust-btn" onClick={() => this.props.setView('catalog')}>Acknowledge</button>
      </div>
    );
  }
}

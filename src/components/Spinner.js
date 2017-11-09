import React, { Component } from 'react';

// This component assumes css in the main HTML

class Spinner extends Component {
  render() {
    return (
      <div className="spinner" style={{ ...this.props.style }}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    )
  }
}

export default Spinner

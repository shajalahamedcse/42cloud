import React, { Component } from 'react';
import { connect } from 'react-redux';

class Volume extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Hello Volume</div>
    )
  }
}

export default connect(null, null)(Volume);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyPairs from './keypairs/KeyPairs';
import { getKeyPairs } from '../actions';

class SSH extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getKeyPairs());
  }

  render() {
    return (
      <KeyPairs />
    )
  }
}

export default connect(null, null)(SSH);
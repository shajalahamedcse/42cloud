import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyPairsList from './KeyPairsList';
import { Spin } from 'antd';

class KeyPairs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return (
        <KeyPairsList payload={this.props.payload} />
      )
    } else {
      return (
        <Spin />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.ssh.loading,
    payload: state.ssh.payload.keypairs
  }
}

export default connect(mapStateToProps, null)(KeyPairs);
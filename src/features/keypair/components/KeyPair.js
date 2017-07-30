import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyPairTable from 'features/keypair/components/KeyPairTable';
import { getKeyPairs } from 'app/orm/nova/keypair/actions';

class KeyPair extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getKeyPairs());
  }

  render() {
    return (
      <KeyPairTable />
    )
  }
}

export default connect(null, null)(KeyPair);
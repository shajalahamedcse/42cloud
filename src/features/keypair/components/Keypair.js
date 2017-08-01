import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeypairTable from 'features/keypair/components/KeypairTable';
import { getKeypairs } from 'app/orm/nova/keypair/actions';

class Keypair extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getKeypairs());
  }

  render() {
    return (
      <KeypairTable />
    )
  }
}

export default connect(null, null)(Keypair);
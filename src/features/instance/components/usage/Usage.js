import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import UsageItem from './UsageItem';

class Usage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return (
        <UsageItem payload={this.props.payload} />
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
    loading: state.instance.loading,
    payload: state.instance.payload.servers
  }
}

export default connect(mapStateToProps, null)(Usage);
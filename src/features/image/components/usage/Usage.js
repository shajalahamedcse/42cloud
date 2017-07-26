import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
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
    loading: state.image.loading,
    payload: state.image.payload.images
  }
}

export default connect(mapStateToProps, null)(Usage);

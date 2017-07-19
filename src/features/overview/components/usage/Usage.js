import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsageCard from './UsageCard';

class Usage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('usage', this.props.data);
    console.log('usage', this.props.loading);
    if (!this.props.loading) {
      return (
        <div>loading...</div>
      )
    } else {
      return (
        <div>
          <UsageCard data={this.props.data.quota_set.instances}
                     colorKey='instances'
                     kind="云主机"
          />

          <UsageCard data={this.props.data.quota_set.cores}
                     colorKey='cores'
                     kind="CPU核"
          />

          <UsageCard data={this.props.data.quota_set.ram}
                     colorKey='ram'
                     kind="内存"
          />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.overview.payload,
    loading: state.overview.loading
  }

}
export default connect(mapStateToProps, null)(Usage);
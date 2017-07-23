import React, { Component } from 'react';
import _ from 'lodash';
import { combineURL } from 'app/commons/common';
import { Spin } from 'antd';
import UsageItem from './UsageItem';
import styles from './style/Usage.css';

class Usage extends Component {
  constructor(props) {
    super(props);

    this.getTenantUsage = this.getTenantUsage.bind(this);

    this.state = {
      loading: false,
      payload: {}
    }
  }

  getTenantUsage() {
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = sessionStorage.getItem('projectID');
    let data = {'project_id': projectID};
    let tenantUsageURL = combineURL('getTenantUsage');
    let startTime = '2017-07-20T00:00:00.000000',
        endTime = '2017-07-21T23:59:59.000000';

    tenantUsageURL = _.template(tenantUsageURL)(data) +
                    '&start=' + startTime + '&end=' + endTime;

    fetch(tenantUsageURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        this.setState({
          loading: true,
          payload: resBody.tenant_usage.server_usages
        });
        console.log(resBody);
      })
    })
  }

  componentDidMount() {
    this.getTenantUsage();
  }

  render() {
    if (this.state.loading) {
      return (
        <UsageItem payload={this.state.payload} />
      )
    } else {
      return (
        <Spin />
      )
    }

  }
}


export default Usage;
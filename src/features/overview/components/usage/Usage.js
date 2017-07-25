import React, { Component } from 'react';
import _ from 'lodash';
import { combineURL } from 'app/commons/common';
import { Spin, DatePicker, Button } from 'antd';
import UsageItem from './UsageItem';
import moment from 'moment';
import styles from './style/Usage.css';

class Usage extends Component {
  constructor(props) {
    super(props);

    this.getTenantUsage = this.getTenantUsage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.onSubmitDate = this.onSubmitDate.bind(this);

    this.state = {
      startValue: null,
      endValue: null,
      loading: false,
      payload: {}
    }
  }

  onSubmitDate() {
    this.getTenantUsage()
  }

  onChange(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  disabledEndDate(endValue) {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  getTenantUsage() {
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = sessionStorage.getItem('projectID');
    let data = {'project_id': projectID};
    let tenantUsageURL = combineURL('getTenantUsage');
    let startTime, endTime;
    if (this.state.startValue && this.state.endValue) {
      // 开始日期那天开始的 UTC 时间
      startTime = moment(this.state.startValue).
                  startOf('day').
                  utc().
                  format('YYYY-MM-DDTHH:mm:ss');

      // 结束日期那天结束的 UTC 时间
      endTime = moment(this.state.endValue).
                endOf('day').
                utc().
                format('YYYY-MM-DDTHH:mm:ss');
    } else {
      // 昨天开始的 UTC 时间
      startTime = moment().
                  subtract(1, 'day').
                  startOf('day').
                  utc().
                  format('YYYY-MM-DDTHH:mm:ss');

      // 今天结束的 UTC 时间
      endTime = moment().
                endOf('day').
                utc().
                format('YYYY-MM-DDTHH:mm:ss');
    }

    tenantUsageURL = _.template(tenantUsageURL)(data) +
                    '&start=' + startTime + '&end=' + endTime;

    fetch(tenantUsageURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        console.log(resBody);
        this.setState({
          loading: true,
          payload: resBody.tenant_usage.server_usages
        });
      })
    })
  }

  componentDidMount() {
    this.getTenantUsage();
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className={styles.header}>
            <span className={styles.title}>使用情况摘要</span>
            <DatePicker size="large"
                        className={styles.date}
                        placeholder="开始"
                        onChange={this.onStartChange} />
            <DatePicker size="large"
                        className={styles.date}
                        disabledDate={this.disabledEndDate}
                        placeholder="结束"
                        onChange={this.onEndChange} />
            <Button size="large"
                    type="primary"
                    onClick={this.onSubmitDate}>
              提交
            </Button>
          </div>
          <UsageItem payload={this.state.payload} />
        </div>
      )
    } else {
      return (
        <Spin />
      )
    }

  }
}


export default Usage;
import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import styles from './style/UsageItem.css';

const tableHeaderName = {
  name: '实例名称',
  flavor: '规格',
  vcpus: 'vCPU数量',
  memory_mb: '内存',
  local_gb: '系统盘',
  hours: '开机时间',
  started_at: '创建时间'
};

function UsageItem(props) {
  let keys = Object.keys(tableHeaderName);
  let columns = [], data = [];

  keys.forEach((key) => {
    columns.push({
      title: tableHeaderName[key],
      dataIndex: key
    })
  });

  let uniqueKey = 0;
  if (props.tenantUsage.hasOwnProperty('server_usages')) {
    props.tenantUsage.server_usages.forEach((ele) => {
      let obj = {};
      obj['key'] = uniqueKey++;
      keys.forEach((key) => {
        if (key === 'started_at') {
          obj[key] = moment(ele[key]).startOf('day').fromNow();
        } else if (key === 'hours') {
          obj[key] = Math.floor(ele[key]) + ' 小时';
        } else {
          obj[key] = ele[key];
        }
      });
      data.push(obj);
    });
  } else {
    data = [];
  }

  return (
    <Table className={styles.item}
           columns={columns}
           dataSource={data}
           size="middle" />
  )
}

export default UsageItem;
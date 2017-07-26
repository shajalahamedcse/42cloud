import React from 'react'
import { Table } from 'antd';
import styles from './style/UsageItem.css';

const tableHeaderName = {
  name: 'name',
  // accessIPv4: 'accessIPv4',
  // accessIPv6: 'accessIPv6',
  progress: 'progress',
  metadata: 'metadata',
  status: 'status',
  updated: 'updated',
  hostID: 'hostID',
  key_name: 'key_name',
  created: 'created',
  config_drive: 'config_drive'
};

function usageItem(props) {
  let keys = Object.keys(tableHeaderName);
  let columns = [], data = [];

  keys.forEach((key) => {
    let sorter;
    switch(key) {
      case 'name': {
        sorter = (a, b) => a.name.length - b.name.length;
        break;
      }
    }

    columns.push({
      title: tableHeaderName[key],
      dataIndex: key,
      sorter: sorter
    })
  });

  let uniqueKey = 0;
  props.payload.forEach((ele) => {
    let obj = {};
    obj['key'] = uniqueKey++;
    keys.forEach((key) => {
      obj[key] = ele[key]
    });

    data.push(obj);
  });

  return (
    <Table className={styles.table} columns={columns} dataSource={data} />
  )
}

export default usageItem;
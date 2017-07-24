import React from 'react';
import { Table } from 'antd';
import styles from './style/UsageItem.css';

const tableHeaderName = {
  name: 'name',
  status: 'status',
  size: 'size',
  owner: 'owner'
};

function UsageItem(props) {
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

export default UsageItem;
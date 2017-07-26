import React from 'react';
import { Table } from 'antd';
import styles from './style/KeyPairsList.css';

const tableHeaderName = {
  name: '密钥对名称',
  fingerprint: '公钥指纹'
};

function KeyPairsList(props) {
  let keys = Object.keys(tableHeaderName);
  let columns = [], data = [];

  keys.forEach((key) => {
    let sorter;
    if (key === 'name') {
      sorter = (a, b) => a.name.length - b.name.length;
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
      obj[key] = ele.keypair[key]
    });
    data.push(obj);
  });

  return (
    <Table className={styles.table} columns={columns} dataSource={data} />
  )
}

export default KeyPairsList;
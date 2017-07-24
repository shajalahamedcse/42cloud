import React from 'react';
import { Table } from 'antd';
import styles from './style/UsageItem.css';

const tableHeaderName = {
  name: '名称',
  description: '描述',
  size: '大小',
  volume_type: '磁盘类型',
  status: '状态',
  attchments: '连接到 serverID 的设备',
  bootable: '可启动',
  disk_format: '磁盘格式'
};

function UsageItem(props) {
  console.log(props);
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
      obj[key] = ele[key]
    });

    data.push(obj);
  });

  return (
    <Table className={styles.table} columns={columns} dataSource={data} />
  )
}

export default UsageItem;
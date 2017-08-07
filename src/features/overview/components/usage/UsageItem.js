import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import styles from './style/UsageItem.css';
import { TENANT_USAGE_TABLE_COLUMN, TENANT_USAGE_FIELD } from 'features/common/constants';

function UsageItem(props) {
  let columns = [], data = [];

  TENANT_USAGE_TABLE_COLUMN.forEach((key) => {
    columns.push({
      title: TENANT_USAGE_FIELD[key],
      dataIndex: key,
    })
  });

  let uniqueKey = 0;
  if (props.tenantUsage.hasOwnProperty('server_usages')) {
    props.tenantUsage.server_usages.forEach((ele) => {
      let obj = {};
      obj['key'] = uniqueKey++;
      TENANT_USAGE_TABLE_COLUMN.forEach((key) => {
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
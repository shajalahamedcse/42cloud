import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';

import { KEYPAIR_TABLE_HEADER } from 'features/keypair/constants';

import styles from './style/KeyPairTable.css';

class KeyPairTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let columns = [];
    Object.keys(KEYPAIR_TABLE_HEADER).forEach((title) => {
      let sorter;
      if (title === 'name') {
        sorter = (a, b) => a.name.length - b.name.length;
      }

      columns.push({
        title: KEYPAIR_TABLE_HEADER[title],
        key: title,
        dataIndex: title,
        sorter: sorter
      })
    });

    let data = [];
    this.props.keypairs.forEach((ele) => {
      data.push(ele.keypair);
    });

    if (this.props.loading) {
      return (
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data}
          rowKey='name'
        />
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
    loading: state.orm.nova.keypairs.loading,
    keypairs: state.orm.nova.keypairs.data,
  }
}

export default connect(mapStateToProps, null)(KeyPairTable);
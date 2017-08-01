import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';

import { selectKeypairs } from 'app/selectors/nova';

import { KEYPAIR_TABLE_COLUMN, KEYPAIR_FIELD } from 'features/keypair/constants';

import styles from './style/KeypairTable.css';

class KeypairTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let columns = [];
    KEYPAIR_TABLE_COLUMN.forEach((title) => {
      let sorter;
      if (title === 'name') {
        sorter = (a, b) => a.name.length - b.name.length;
      }

      columns.push({
        title: KEYPAIR_FIELD[title],
        key: title,
        dataIndex: title,
        sorter: sorter
      })
    });

    let data = [];
    this.props.keypairs.data.forEach((ele) => {
      data.push(ele.keypair);
    });

    if (this.props.keypairs.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data}
          rowKey='name'
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({ keypairs: selectKeypairs(state) });
export default connect(mapStateToProps, null)(KeypairTable);
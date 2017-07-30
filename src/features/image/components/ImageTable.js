import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';

import { IMAGE_TABLE_HEADER } from 'features/image/constants';
import styles from './style/ImageTable.css';

class ImageTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let columns = [];
    Object.keys(IMAGE_TABLE_HEADER).forEach((title) => {
      let sorter;
      switch(title) {
        case 'name': {
          sorter = (a, b) => a.name.length - b.name.length;
          break;
        }
      }

      columns.push({
        title: IMAGE_TABLE_HEADER[title],
        key: title,
        dataIndex: title,
        sorter: sorter
      })
    });

    let data = [];
    this.props.images.forEach((ele) => {
      data.push(ele);
    })

    if (this.props.loading) {
      return (
        <Table
          className={styles.table}
          columns={columns}
          rowClassName={(record, index) => ('row' + index)}
          dataSource={data}
          rowKey='id'
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
    loading: state.orm.glance.images.loading,
    images: state.orm.glance.images.data,
  }
}

export default connect(mapStateToProps, null)(ImageTable);

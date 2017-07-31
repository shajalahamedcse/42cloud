import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/glance';

import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/image/constants';
import styles from './style/ImageTable.css';

class ImageTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let columns = [];
    IMAGE_TABLE_COLUMN.forEach((title) => {
      let sorter;
      switch(title) {
        case 'name': {
          sorter = (a, b) => a.name.length - b.name.length;
          break;
        }
      }

      columns.push({
        title: IMAGE_FIELD[title],
        key: title,
        dataIndex: title,
        sorter: sorter
      })
    });

    let data = [];
    this.props.images.data.forEach((ele) => {
      data.push(ele);
    });

    if (this.props.images.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <Table
          className={styles.table}
          columns={columns}
          rowClassName={(record, index) => ('row' + index)}
          dataSource={data}
          rowKey='id'
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    images: selectImages(state)
  }
}

export default connect(mapStateToProps, null)(ImageTable);

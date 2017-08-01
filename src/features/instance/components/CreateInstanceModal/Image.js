import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/glance';
import { Spin, Table } from 'antd';
import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/image/constants';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //
    const columns = [];
    IMAGE_TABLE_COLUMN.forEach(title => {
      columns.push({
        title: IMAGE_FIELD[title],
        key: title,
        dataIndex: title,
      })
    });
    //
    const data = [];
    this.props.images.data.forEach(ele => {
      data.push(ele);
    });

    if (this.props.images.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <Table
          showHeader={false}
          columns={columns}
          dataSource={data}
          rowKey='id'
          scroll={{y: 300}}
          size="middle"
          rowSelection={{type: 'radio'}}
          pagination={false}
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

export default connect(mapStateToProps, null)(Image);
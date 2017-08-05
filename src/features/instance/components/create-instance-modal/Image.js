import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/glance';
import { Spin, Table } from 'antd';
import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/common/constants';

import { choosedImage } from 'features/instance/actions';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRows) => {
    this.props.dispatch(choosedImage(selectedRows[0]));
  };

  render() {
    const rowSelection= {
      type: 'radio',
      onChange: this.onSelectChange
    };

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
          rowSelection={rowSelection}
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
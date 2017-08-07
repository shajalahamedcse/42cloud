import React from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/glance';
import filesize from 'filesize';

import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/common/constants';

class ImageTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.images.loading) {
      return (
        <Spin />
      )
    } else {
      let columns = [];
      IMAGE_TABLE_COLUMN.forEach((title) => {
        let sorter, render;
        switch(title) {
          case 'name': {
            sorter = (a, b) => a.name.length - b.name.length;
            break;
          }

          case 'size': {
            render = (text) => {
              let size = filesize(text);
              return (
                <div>{size}</div>
              )
            };
            break;
          }

          default:
            break;
        }

        columns.push({
          title: IMAGE_FIELD[title],
          key: title,
          dataIndex: title,
          sorter: sorter,
          render: render
        })
      });

      let data = [];
      this.props.images.data.forEach((ele) => {
        data.push(ele);
      });

      return (
        <Table
          columns={columns}
          bordered
          size="middle"
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

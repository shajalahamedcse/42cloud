import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFlavors } from 'app/selectors/nova';

import { availableNetwork } from 'features/instance/actions';

import { Spin, Table } from 'antd';

const FLAVORS_TABLE_COLUMN = [
  "name",
  "vcpus",
  "ram",
  "disk"
];

const FLAVORS_FIELD = {
  "name": "规格名称",
  "vcpus": "vCPU数量",
  "ram": "内存大小",
  "disk": "系统盘大小"
};

class Flavor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.flavors.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      FLAVORS_TABLE_COLUMN.forEach(title => {
        columns.push({
          title: FLAVORS_FIELD[title],
          key: title,
          dataIndex: title,
        })
      });

      const data = [];
      this.props.flavors.data.forEach(ele => {
        data.push(ele)
      });
      return (
        <Table
          rowSelection={{ type: 'radio'}}
          columns={columns}
          dataSource={data}
          size="middle"
          rowKey='id'
          pagination={false}
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  flavors: selectFlavors(state),
});

export default connect(mapStateToProps, null)(Flavor);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFlavors } from 'app/selectors/nova';
import { FLAVOR_TABLE_COLUMN, FLAVOR_FIELD } from 'features/common/constants';
import { choosedFlavor } from 'features/instance/actions';

import { Spin, Table } from 'antd';

class Flavor extends Component {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRows) => {
    this.props.dispatch(choosedFlavor(selectedRows[0]));
  };

  componentWillMount() {
    if (!this.props.choosedFlavor) {
      let defaultFlavorId = this.props.flavors.data[0].id;
      this.props.dispatch(choosedFlavor(defaultFlavorId));
    }
  };

  render() {
    const rowSelection = {
      type: 'radio',
      onChange: this.onSelectChange,
      selectedRowKeys: [this.props.choosedFlavor],
    };

    if (this.props.flavors.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      FLAVOR_TABLE_COLUMN.forEach(title => {
        columns.push({
          title: FLAVOR_FIELD[title],
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
          rowSelection={rowSelection}
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
  choosedFlavor: state.features.instance.create.choosedFlavor,
});

export default connect(mapStateToProps, null)(Flavor);
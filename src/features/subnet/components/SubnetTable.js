import React from 'react';
import { connect } from 'react-redux';
import { selectSubnets } from 'app/selectors/neutron';
import { SUBNET_TABLE_COLUMN, SUBNET_FIELD } from 'features/common/constants';
import { Spin, Table } from 'antd';

class SubnetTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.subnets.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      SUBNET_TABLE_COLUMN.forEach(item => {
        columns.push({
          title: SUBNET_FIELD[item],
          dataIndex: item,
        })
      });

      const data = [];
      this.props.subnets.data.forEach(item => {
        data.push(item)
      });

      return(
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          rowKey="id"
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  subnets: selectSubnets(state)
});

export default connect(mapStateToProps, null)(SubnetTable);
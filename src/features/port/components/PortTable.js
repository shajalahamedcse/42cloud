import React from 'react';
import { connect } from 'react-redux';
import { selectPorts } from 'app/selectors/neutron';
import { Spin, Table } from 'antd';
import { PORT_TABLE_COLUMN, PORT_FIELD } from 'features/common/constants';

class PortTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ports.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      PORT_TABLE_COLUMN.forEach(item => {
        columns.push({
          title: PORT_FIELD[item],
          dataIndex: item
        })
      });

      const data = [];
      this.props.ports.data.forEach(item => {
        data.push(item);
      });

      return (
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
  ports: selectPorts(state)
});

export default connect(mapStateToProps, null)(PortTable)
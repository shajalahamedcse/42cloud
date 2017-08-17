import React from 'react';
import { connect } from 'react-redux';
import { selectRouterPorts } from 'app/selectors/neutron';
import { Spin, Table } from 'antd';
import { PORT_TABLE_COLUMN, PORT_FIELD } from 'features/common/constants';

class PortTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.routerPorts.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      PORT_TABLE_COLUMN.forEach(item => {
        let render;
        if (item === 'name') {
          render = (text, record) => {
            let replaceName = '';
            if (text) {
              replaceName = text;
            } else {
              let id = record.id.split('-')[0];
              replaceName = `(${id})`;
            }
            return (
              <span>{replaceName}</span>
            )
          }
        } else if (item === 'fixed_ips') {
          render = (text) => {
            let ipArrs = [];
            text.forEach(ip => {
              ipArrs.push(ip['ip_address']);
            });

            return (
              <span>{ipArrs}</span>
            )
          }
        } else if (item === 'admin_state_up') {
          render = (text) => {
            return (
              <span>{text.toString()}</span>
            )
          }
        }

        columns.push({
          title: PORT_FIELD[item],
          dataIndex: item,
          render: render
        })
      });

      const data = [];
      this.props.routerPorts.data.forEach(item => {
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
  routerPorts: selectRouterPorts(state)
});

export default connect(mapStateToProps, null)(PortTable)
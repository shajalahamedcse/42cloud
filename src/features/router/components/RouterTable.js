import React from 'react';
import { connect } from 'react-redux';
import { selectRouters } from 'app/selectors/neutron';
import { Spin, Table } from 'antd';
import { ROUTER_FIELD, ROUTER_TABLE_COLUMN } from 'features/common/constants';

class RouterTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.routers.loading) {
      return(
        <Spin />
      )
    } else {
      const columns = [];
      let render;
      ROUTER_TABLE_COLUMN.forEach(item => {
        if (item === 'external_gateway_info') {
          let ipArrs = [];
          render = (text) => {
            text['external_fixed_ips'].forEach(ip => {
              ipArrs.push(
                <div key={ip['ip_address']}>
                  {ip['ip_address']}
                  </div>
              )
            });
            return (
              <span>{ipArrs}</span>
            )
          };
        }

        columns.push({
          title: ROUTER_FIELD[item],
          dataIndex: item,
          render: render
        })
      });

      const data = [];
      this.props.routers.data.forEach(item => {
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

const mapStateToProps = (state) => {
  return {
    routers: selectRouters(state)
  }
};

export default connect(mapStateToProps, null)(RouterTable);
import React from 'react';
import { connect } from 'react-redux';
import { selectSubnets } from 'app/selectors/neutron';
import { selectRouterPorts } from 'app/selectors/neutron';
import { uniqueArr } from 'app/commons/common';
import { SUBNET_TABLE_COLUMN, SUBNET_FIELD } from 'features/common/constants';
import { Spin, Table } from 'antd';

function SubnetTable(props) {

    if (props.subnets.loading ||
      props.routerPorts.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      SUBNET_TABLE_COLUMN.forEach(item => {
        let render;
        if (item === 'name') {
          render = (text, record) => {
            let replaceName = '';
            if (text) {
              replaceName = text;
            } else {
              let id = record.id.split('-')[0];
              replaceName = `(${id})`
            }

            return (
              <span>{replaceName}</span>
            )
          }
        }
        columns.push({
          title: SUBNET_FIELD[item],
          dataIndex: item,
          render: render
        })
      });

      // 获取特定路由器的子网并且去重
      let subnetIds = [];
      props.routerPorts.data.forEach(port => {
        port.fixed_ips.forEach(item => {
          subnetIds.push(item.subnet_id);
        });
      });
      subnetIds = uniqueArr(subnetIds);

      let subnetsData = [];
      props.subnets.data.forEach(item => {
        if (subnetIds.indexOf(item.id) >= 0) {
          subnetsData.push(item);
        }
      });

      const data = [];
      subnetsData.forEach(item => {
        data.push(item)
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

const mapStateToProps = (state) => ({
  subnets: selectSubnets(state),
  routerPorts: selectRouterPorts(state),
});

export default connect(mapStateToProps, null)(SubnetTable);
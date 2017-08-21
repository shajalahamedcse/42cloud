import React from 'react';
import { connect } from 'react-redux';
import Subnet from 'features/subnet';
import Port from 'features/port';
import Graph from 'features/graph';
import { getServersInfo } from 'app/orm/nova/server/actions';
import { getSubnets } from 'app/orm/neutron/subnet/actions';
import { getRouterInterfacePorts } from 'app/orm/neutron/port/actions';
import { getNetworks } from 'app/orm/neutron/network/actions';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './index.css';

class DetailTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTabClick = (key) => {
    console.log(key);
    if (key === 'graph') {
      this.props.dispatch(getRouterInterfacePorts(this.props.routerID));
      this.props.dispatch(getNetworks());
      this.props.dispatch(getServersInfo());
      this.props.dispatch(getSubnets());
    }
  };

  render() {
    return (
        <Tabs
          animated={false}
          defaultActiveKey="subnet"
          onTabClick={(key) => this.handleTabClick(key)}
          className={styles.detailtabs}
        >
          <TabPane
            tab="子网"
            key="subnet">
            <Subnet />
          </TabPane>

          <TabPane tab="端口" key="port">
            <Port />
          </TabPane>

          <TabPane tab="配置" key="setting">
            配置
          </TabPane>

          <TabPane tab="图形化" key="graph">
            <Graph />
          </TabPane>

          <TabPane tab="操作日志" key="log">
            操作日志
          </TabPane>
        </Tabs>
    )
  }
}

export default connect(null, null)(DetailTabs);
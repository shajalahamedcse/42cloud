import React from 'react';
import { connect } from 'react-redux';
import Subnet from 'features/subnet';
import Port from 'features/port';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

import styles from './index.css';

class DetailTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTabClick = (key) => {
    console.log(key);
    console.log(this.props.routerId);
  };

  render() {
    return (
        <Tabs
          animated={false}
          defaultActiveKey="subnet"
          onTabClick={(key) => this.handleTabClick(key)}
          className={styles.detailtabs}
        >
          <TabPane tab="子网" key="subnet">
            <Subnet />
          </TabPane>

          <TabPane tab="端口" key="port">
            <Port />
          </TabPane>

          <TabPane tab="配置" key="setting">
            配置
          </TabPane>

          <TabPane tab="图形化" key="graph">
            图形化
          </TabPane>

          <TabPane tab="操作日志" key="log">
            操作日志
          </TabPane>
        </Tabs>
    )
  }
}

export default connect(null, null)(DetailTabs);
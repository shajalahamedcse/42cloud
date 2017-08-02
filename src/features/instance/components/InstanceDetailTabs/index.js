import React, { Component } from 'react';
import { Tabs } from 'antd';
import ConsoleLog from './ConsoleLog';
import Monitor from './Monitor';

const TabPane = Tabs.TabPane;

class InstanceDetailTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.instanceID);

    return (
      <div>
        <Tabs>
          <TabPane tab="控制台日志" key="log">
            <ConsoleLog instanceID={this.props.instanceID} />
          </TabPane>

          <TabPane tab="监控" key="monitor">
            <Monitor />
          </TabPane>
        </Tabs>
      </div>
    )
  }

}

export default InstanceDetailTabs;
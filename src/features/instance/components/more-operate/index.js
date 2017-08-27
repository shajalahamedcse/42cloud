import React from 'react';
import MoreOperateButton from 'components/more-operate';
import { Menu } from 'antd';
import EditInstanceModal from './EditInstanceModal';

import commonStyles from 'features/common/styles.css';

class MoreOperate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menu = (
      <Menu
        className={commonStyles.menu}
        onClick={this.props.handleMenuClick}
      >
        <Menu.Item
          key="manage"
          disabled={true}
        >
          <i className="fa fa-trash">管理安全组</i>
        </Menu.Item>

        <Menu.Item
          key="edit"
        >
          <i className="fa fa-trash">编辑云主机</i>
        </Menu.Item>

        <Menu.Item
          key="create"
        >
          <i className="fa fa-trash">制作成镜像</i>
        </Menu.Item>

        <Menu.Item
          key="reboot"
          disabled={true}
        >
          <i className="fa fa-trash">硬重启</i>
        </Menu.Item>

        <Menu.Item
          key="stop"
          disabled={true}
        >
          <i className="fa fa-trash">关机</i>
        </Menu.Item>

        <Menu.Item
          key="start"
          disabled={true}
        >
          <i className="fa fa-trash">开机</i>
        </Menu.Item>

        <Menu.Item
          key="destroy"
          disabled={true}
        >
          <i className="fa fa-trash">销毁</i>
        </Menu.Item>
      </Menu>
    );

    return (
      <div
        style={{
          'float': 'left'
        }}
      >
        <EditInstanceModal />
        <MoreOperateButton menu={menu} />
      </div>
    )
  }
}

export default MoreOperate;
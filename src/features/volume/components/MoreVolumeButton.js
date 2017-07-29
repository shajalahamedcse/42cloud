import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Icon } from 'antd';

class MoreVolumeButton extends Component {
  constructor(props) {
    super(props);
  }

  handleMenuClick = (key) => {
    this.props.handleClick(key.key, true)
  }

  render() {
    let selectedVolumes = this.props.selectedVolumes;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item
          key="mount"
          disabled={selectedVolumes.length < 1}
        >
          <i className="fa fa-desktop">加载硬盘到主机</i>
        </Menu.Item>

        <Menu.Item
          key="unmount"
          disabled={selectedVolumes.length < 1}
        >
          <i className="fa fa-desktop">卸载硬盘</i>
        </Menu.Item>

        <Menu.Item
          key="resize"
          disabled={selectedVolumes.length !== 1}
        >
          <i className="fa fa-desktop">扩容</i>
        </Menu.Item>

        <Menu.Item
          key="modify"
          disabled={selectedVolumes.length !== 1}
        >
          <i className="fa fa-desktop">修改</i>
        </Menu.Item>

        <Menu.Item
          key="delete"
          disabled={selectedVolumes.length < 1}
        >
          <i className="fa fa-desktop">删除</i>
        </Menu.Item>
      </Menu>
    );

    return(
      <span>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="primary">
            更多操作<Icon type="down" />
          </Button>
        </Dropdown>
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedVolumes: state.volume.selectedVolumes
  }
}

export default connect(mapStateToProps, null)(MoreVolumeButton);
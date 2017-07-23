import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Menu } from 'antd';

const { SubMenu } = Menu;

class SideNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.selected);
    return (
      <div>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultOpenKeys={['comnet']}
          defaultSelectedKeys={[this.props.selected]}
          mode="inline"
        >

          <Menu.Item key="overview">
            <i className="fa fa-tachometer fa-lg"></i>
            <Link to="/console/overview">
            <span>总览</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="comnet"
            title={<span><i className="fa fa-server fa-lg"></i><span>计算与网络</span></span>}
          >
            <Menu.Item key="instance"><Link to="/console/instance">云主机</Link></Menu.Item>
            <Menu.Item key="image">镜像</Menu.Item>
            <Menu.Item key="vpc">VPC 网络</Menu.Item>
          </SubMenu>

          <SubMenu
            key="storage"
            title={<span><i className="fa fa-hdd-o fa-lg"></i><span>存储</span></span>}
          >
            <Menu.Item key="volume">硬盘</Menu.Item>
          </SubMenu>

          <SubMenu
            key="security"
            title={<span><i className="fa fa-bolt fa-lg"></i><span>安全</span></span>}
          >
            <Menu.Item key="secgroup">安全组</Menu.Item>
            <Menu.Item key="keypair">SSH密钥</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SideNav;


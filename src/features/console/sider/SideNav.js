import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './style/SideNav.css';

import { Menu } from 'antd';

const { SubMenu } = Menu;

class SideNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
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
            <Link to="/console/overview">
              <i className={(styles.fa) + " " + "fa fa-tachometer fa-lg"}>
                总览
              </i>
            </Link>
          </Menu.Item>

          <SubMenu
            key="comnet"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>计算与网络</i>}
          >
            <Menu.Item key="instance">
              <Link to="/console/instance">云主机</Link>
            </Menu.Item>
            <Menu.Item key="image">
              <Link to="/console/image">镜像</Link>
            </Menu.Item>
            <Menu.Item key="vpc">VPC 网络</Menu.Item>
          </SubMenu>

          <SubMenu
            key="storage"
            title={<i className={(styles.fa) + " " + "fa fa-hdd-o fa-lg"}>存储</i>}
          >
            <Menu.Item key="volume">
              <Link to="/console/volume">
              硬盘
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="security"
            title={<i className={(styles.fa) + " " + "fa fa-bolt fa-lg"}>安全</i>}
          >
            <Menu.Item key="secgroup">安全组</Menu.Item>
            <Menu.Item key="keypair">
              <Link to="/console/keypair">
                SSH密钥
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SideNav;


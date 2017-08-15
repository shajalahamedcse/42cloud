import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style/SideNav.css';

import { Menu } from 'antd';

const { SubMenu } = Menu;

class SideNav extends React.Component {
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
            key="compute"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>计算</i>}
          >
            <Menu.Item key="instance">
              <Link to="/console/instance">云主机</Link>
            </Menu.Item>
            <Menu.Item key="volume">
              <Link to="/console/volume">
                硬盘
              </Link>
            </Menu.Item>
            <Menu.Item key="image">
              <Link to="/console/image">镜像</Link>
            </Menu.Item>

            <Menu.Item key="vpc">
              <Link to="/console/vpc">VPC</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="network"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>网络</i>}
          >
            <Menu.Item key="router">
              <Link to="/console/router">路由器</Link>
            </Menu.Item>
            <Menu.Item key="subnet">
              <Link to="/console/subnet">子网</Link>
            </Menu.Item>
            <Menu.Item key="port">
              <Link to="/console/port">端口</Link>
            </Menu.Item>
          </SubMenu>

          {/*<SubMenu*/}
            {/*key="storage"*/}
            {/*title={<i className={(styles.fa) + " " + "fa fa-hdd-o fa-lg"}>存储</i>}*/}
          {/*>*/}
          {/*</SubMenu>*/}

          <SubMenu
            key="security"
            title={<i className={(styles.fa) + " " + "fa fa-bolt fa-lg"}>安全</i>}
          >
            {/*<Menu.Item key="secgroup">安全组</Menu.Item>*/}
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


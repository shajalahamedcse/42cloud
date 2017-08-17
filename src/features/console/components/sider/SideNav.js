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
            <Menu.Item key="instances">
              <Link to="/console/instances">云主机</Link>
            </Menu.Item>

            <Menu.Item key="volumes">
              <Link to="/console/volumes">
                硬盘
              </Link>
            </Menu.Item>

            <Menu.Item key="images">
              <Link to="/console/images">镜像</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="net"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>网络</i>}
          >
            <Menu.Item key="vpc">
              <Link to="/console/vpc">VPC</Link>
            </Menu.Item>

            <Menu.Item key="networks">
              <Link to="/console/networks">网络</Link>
            </Menu.Item>

            <Menu.Item key="routers">
              <Link to="/console/routers">路由器</Link>
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
            <Menu.Item key="keypairs">
              <Link to="/console/keypairs">
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


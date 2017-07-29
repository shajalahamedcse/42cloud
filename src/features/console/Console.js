import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import SideNav from './sider/SideNav';
import TopNav from './header/TopNav';
import { CONSOLE_ROUTES as console_routes } from './constants';
import { Layout, Breadcrumb } from 'antd';
import styles from './Console.css';

const { Header, Sider, Content } = Layout;

class Console extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.match.params.feature;
    return (
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <TopNav />
        </Header>

        <Sider className={styles.sider}>
          <SideNav selected={feature} />
        </Sider>

        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/">主页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/console/" + [feature]}>{feature}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Route
            path="/console/:feature"
            component={console_routes[feature]}
          />
        </Content>
      </Layout>
    );
  }
}

export default Console;

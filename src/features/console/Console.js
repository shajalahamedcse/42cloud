import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SideNav from './side/SideNav';
import TopNav from './top/TopNav';
import FooterInfo from './footer/FooterInfo';
import { CONSOLE_ROUTES as console_routes } from './constants';
import { Layout, Breadcrumb } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

class Console extends Component {
  constructor(props) {
    super(props);

    this.onCollapse = this.onCollapse.bind(this);
    this.state = {
      collapsed: false
    };
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  };

  render() {
    let feature = this.props.match.params.feature;
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <SideNav />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <TopNav />
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>

            <BrowserRouter>
              <div>
                <Route
                  path={"/console/" + feature}
                  component={console_routes[feature]}
                />
              </div>
            </BrowserRouter>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <FooterInfo />
          </Footer>
        </Layout>

      </Layout>
    );
  }
}

export default Console;

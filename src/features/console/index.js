import React from 'react';
import { Route, Link } from 'react-router-dom';
import SideNav from './components/sider/SideNav';
import TopNav from './components/header/TopNav';
import { BREADCRUMB_FIELD, CONSOLE_ROUTES } from 'features/common/constants';
import { Layout, Breadcrumb } from 'antd';
import styles from './index.css';

const { Header, Sider, Content } = Layout;

class Console extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.match.params.feature;
    return (
      <Layout
        style={{'flexDirection': 'column'}}
        className={styles.layout}
      >
        <Header className={styles.header}>
          <TopNav />
        </Header>

        <Sider className={styles.sider}>
          <SideNav selected={feature} />
        </Sider>

        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/">{BREADCRUMB_FIELD['console']}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/console/" + [feature]}>{BREADCRUMB_FIELD[feature]}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Route
            path="/console/:feature"
            component={CONSOLE_ROUTES[feature]}
          />
        </Content>
      </Layout>
    );
  }
}

export default Console;

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import styles from './HomeHeader.css';

const { Header } = Layout;

function HomeHeader() {
    return (
      <div className={styles.header}>
        <Header>
          <span className={styles.logo}>42cloud</span>
          <Link to="/login">
            <Button type="primary" size="large" className={styles.login}>登录</Button>
          </Link>
        </Header>
      </div>
    )
}
export default HomeHeader;
import React from 'react';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeFooter from './HomeFooter';
import styles from './style/Home.css'
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;


function Home() {
  return (
    <Layout>
      <Header className={styles.header}>
        <HomeHeader />
      </Header>

      <Content>
        <HomeContent />
      </Content>

      <Footer>
        <HomeFooter />
      </Footer>
    </Layout>
  )
}

export default Home;
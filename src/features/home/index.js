import React from 'react';
import HomeHeader from './components/HomeHeader';
import HomeContent from './components/HomeContent';
import HomeFooter from './components/HomeFooter';
import styles from './index.css'
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
import React from 'react';
import { Layout } from 'antd';

import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeFooter from './HomeFooter';

function Home() {
  return (
    <Layout>
      <HomeHeader />
      <HomeContent />
      <HomeFooter />
    </Layout>
  )
}
export default Home;
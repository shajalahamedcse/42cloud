import React from 'react';
import { Layout, Carousel } from 'antd';
import home01 from '../../assets/images/home_01.jpg';
import home02 from '../../assets/images/home_02.jpg';
import home03 from '../../assets/images/home_03.jpg';

import styles from './HomeContent.css';

const { Content } = Layout;

function HomeContent() {
    return (
      <div className={styles.content}>
        <Content>
          <Carousel autoplay>
              <img className={styles.slider} src={home01} />
              <img className={styles.slider} src={home02} />
              <img className={styles.slider} src={home03} />
          </Carousel>
        </Content>
      </div>
    )
}
export default HomeContent;
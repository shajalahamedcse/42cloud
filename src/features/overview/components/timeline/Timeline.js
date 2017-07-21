import React from 'react';
import { Timeline } from 'antd';
import styles from './style/Timeline.css';

function ShowTimeline() {
  return (
    <Timeline className={styles.timeline}>
      <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
      <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
      <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
      <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
    </Timeline>
  )
}

export default ShowTimeline;
import React from 'react';
import UsageCardPie from './UsageCardPie';
import { Card, Col, Row } from 'antd';
import styles from './UsageCard.css';

function UsageCard() {
  return (
    <div>
      <Card className={styles.card}>
        <UsageCardPie />
        <span>使用率 50%</span>
      </Card>
      <Card className={styles.card}>
        <UsageCardPie />
        <span>使用率 50%</span>
      </Card>
    </div>
  )
}

export default UsageCard;
import React from 'react';
import { connect } from 'react-redux';
import { Progress, Spin, Row, Col } from 'antd';
import styles from './style/Quota.css';

function Quota(props) {
  if (props.loading) {
    let quotaItems = props.data.quota_set,
        quotaItemElements = [];
    for (let item in quotaItems) {
      if (quotaItems.hasOwnProperty(item) && (String(item) !== 'id')) {
        let inUse = quotaItems[item].in_use,
            limit = quotaItems[item].limit,
            unUsed;

        if (limit < 0) {
          limit = '无限';
          unUsed = '无限';
        } else {
          unUsed = limit - inUse;
        }

        let percentValue = (inUse / limit).toFixed(2) * 100;
        quotaItemElements.push(
          <div className={styles.item} key={String(item)}>
            <Row>
              <Col span={8}>{item}</Col>
              <Col span={16}>
                <Row type="flex" justify="end" gutter={6}>
                  <Col>{inUse} 已用 |</Col>
                  <Col>{unUsed} 剩余 |</Col>
                  <Col>{limit} 配额</Col>
                </Row>
              </Col>
            </Row>
            <Progress
              strokeWidth={12}
              percent={percentValue}
              showInfo={false}
            />
          </div>
        )
      }
    }

    return (
      <div className={styles.quota}>
        <p className={styles.title}>
          资源配额使用情况
        </p>
        {quotaItemElements}
      </div>
    )
  } else {
    return (
      <Spin />
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.overview.loading,
    data: state.overview.payload
  }
}
export default connect(mapStateToProps, null)(Quota);
import React from 'react';
import { connect } from 'react-redux';
import { selectRouterInfo } from 'app/selectors/neutron';
import { ROUTER_FIELD } from 'features/common/constants';
import { Spin } from 'antd';
import styles from './style/DetailOverview.css';

function DetailOverview(props) {

  if (props.routerInfo.loading) {
    return (
      <Spin />
    )
  } else {
    let routerInfo = props.routerInfo.data;
    return (
      <div className={styles.overview}>
        <div className={styles.title}>路由器详情</div>

        <div className={styles.basic}>
          <div className={styles.subtitle}>基本信息</div>
          <dl>
            <dt>{ROUTER_FIELD['name']}</dt>
            <dd>{routerInfo.name}</dd>
            <dt>{ROUTER_FIELD['status']}</dt>
            <dd>{routerInfo.status}</dd>
          </dl>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  routerInfo: selectRouterInfo(state)
});
export default connect(mapStateToProps, null)(DetailOverview);
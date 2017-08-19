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
          <p>
            <span>{ROUTER_FIELD['name']}：</span>
            <span>{routerInfo.name}</span>
          </p>

          <p>
            <span>{ROUTER_FIELD['status']}：</span>
            <span>{routerInfo.status}</span>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  routerInfo: selectRouterInfo(state)
});
export default connect(mapStateToProps, null)(DetailOverview);
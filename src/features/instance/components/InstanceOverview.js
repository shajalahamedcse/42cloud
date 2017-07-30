import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { INSTANCE_FIELD } from 'features/instance/constants';
import styles from './style/InstanceOverview.css';

class InstanceOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.serverLoading) {
      let serverInfo = this.props.server;
      let addressKeys = Object.keys(serverInfo.addresses);
      let networkArrs = [];
      let ipArrs = [];
      addressKeys.forEach(key => {
        if (serverInfo.addresses[key].length > 0) {
          serverInfo.addresses[key].forEach(ele => {
            ipArrs.push(
              <div className={styles.ipinfo} key={ele['addr']}>
                <span>{ele['addr']}</span>
                <span className={styles.iplabel}>{ele['OS-EXT-IPS:type']}</span>
              </div>)
          });
          networkArrs.push(<dl key={key}>
            <dt>{key}</dt>
            <dd>{ipArrs}</dd>
          </dl>)
        } else {
          networkArrs.push(<dl key={key}>
            <dt>{key}</dt>
            <dd>{serverInfo['addresses'][ele][0].address}</dd>
          </dl>)
        }
      });

      return (
        <div className={styles.overview}>
          <div className={styles.title}>实例详情</div>

          <div className={styles.basic}>
            <div className={styles.subtitle}>基本信息</div>
            <dl>
              <dt>{INSTANCE_FIELD['name']}</dt>
              <dd>{serverInfo.name}</dd>
              <dt>{INSTANCE_FIELD['id']}</dt>
              <dd>{serverInfo.id}</dd>
              <dt>{INSTANCE_FIELD['status']}</dt>
              <dd>{serverInfo.status}</dd>
              <dt>{INSTANCE_FIELD['OS-EXT-AZ:availability_zone']}</dt>
              <dd>{serverInfo['OS-EXT-AZ:availability_zone']}</dd>
              <dt>{INSTANCE_FIELD['image']}</dt>
              <dd>{serverInfo.image.id}</dd>
            </dl>
          </div>

          <div className={styles.flavor}>
            <div className={styles.subtitle}>配置规格</div>
            <dl>
              <dt>flavor</dt>
              <dd>{serverInfo.name}</dd>
              <dt>flavorID</dt>
              <dd>{serverInfo.id}</dd>
              <dt>memory</dt>
              <dd>{serverInfo.status}</dd>
              <dt>vcpu</dt>
              <dd>{serverInfo.image.id}</dd>
              <dt>disk</dt>
              <dd>{serverInfo.image.id}</dd>
            </dl>
          </div>

          <div className={styles.addresses}>
            <div className={styles.subtitle}>IP地址</div>
            {networkArrs}
          </div>

          <div className={styles.security}>
            <div className={styles.subtitle}>安全配置</div>
            <dl>
              <dt>{INSTANCE_FIELD['key_name']}</dt>
              <dd>{serverInfo.key_name}</dd>
              <dt>{INSTANCE_FIELD['security_groups']}</dt>
              <dd>{serverInfo.security_groups[0].name}</dd>
            </dl>
          </div>
        </div>
      )
    } else {
      return (
        <Spin />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    serverLoading: state.orm.nova.server.loading,
    server: state.orm.nova.server.data,
  }
}

export default connect(mapStateToProps, null)(InstanceOverview);
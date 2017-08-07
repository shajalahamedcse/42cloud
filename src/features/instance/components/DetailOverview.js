import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { INSTANCE_FIELD, INSTANCE_STATUS, FLAVOR_FIELD } from 'features/common/constants';
import { selectServer, selectFlavors } from 'app/selectors/nova';
import { selectImages } from 'app/selectors/glance';
import styles from './style/DetailOverview.css';

class DetailOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.server.loading ||
      this.props.flavors.loading ||
      this.props.images.loading) {
      return (
        <Spin />
      )
    } else {
      let flavorsInfo = this.props.flavors.data;
      let serverInfo = this.props.server.data;

      let networkArrs = [];
      let addressKeys = Object.keys(serverInfo.addresses);
      addressKeys.forEach(key => {
        if (serverInfo.addresses[key].length > 0) {
          let ipArrs = [];
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

      let imageIndex = this.props.images.data.findIndex(image => image.id === serverInfo.image.id);
      let imageName = this.props.images.data[imageIndex].name;

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
              <dd>{INSTANCE_STATUS[serverInfo.status]}</dd>
              <dt>{INSTANCE_FIELD['OS-EXT-AZ:availability_zone']}</dt>
              <dd>{serverInfo['OS-EXT-AZ:availability_zone']}</dd>
              <dt>{INSTANCE_FIELD['image']}</dt>
              <dd>{imageName}</dd>
            </dl>
          </div>

          <div className={styles.flavor}>
            <div className={styles.subtitle}>配置规格</div>
            <dl>
              <dt>{FLAVOR_FIELD['name']}</dt>
              <dd>{flavorsInfo[0].name}</dd>
              <dt>{FLAVOR_FIELD['id']}</dt>
              <dd>{flavorsInfo[0].id}</dd>
              <dt>{FLAVOR_FIELD['ram']}</dt>
              <dd>{flavorsInfo[0].ram}</dd>
              <dt>{FLAVOR_FIELD['vcpus']}</dt>
              <dd>{flavorsInfo[0].vcpus}</dd>
              <dt>{FLAVOR_FIELD['disk']}</dt>
              <dd>{flavorsInfo[0].disk}</dd>
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
    }
  }
}

const mapStateToProps = (state) => ({
  server: selectServer(state),
  flavors: selectFlavors(state),
  images: selectImages(state),
});

export default connect(mapStateToProps, null)(DetailOverview);
import React from 'react';
import { connect } from 'react-redux';
import { Progress, Spin, Row, Col } from 'antd';
import styles from './style/Quota.css';
import QuotaItem from './QuotaItem.js';

const quotaTitleName = {
  injected_file_content_bytes: '注入的文件内容字节数 (个)',
  metadata_items: '元数据条目 (个)',
  server_group_members: '主机组成员 (个)',
  server_groups: '主机组 (个)',
  ram: '内存 (MB)',
  floating_ips: '浮动IP (个)',
  key_pairs: '密钥对 (个)',
  instances: '实例 (个)',
  security_group_rules: '安全组规则 (个)',
  injected_files: '注入的文件 (个)',
  cores: 'vCPU数量 (核)',
  fixed_ips: '固定IP (个)',
  injected_file_path_bytes: '注入文件路径的长度 (个)',
  security_groups: '安全组 (个)',
}


function Quota(props) {
  if (props.loading) {
    let quotaItems = props.data.quota_set,
        quotaItemElements = [];

    for (let item in quotaItems) {
      if (quotaItems.hasOwnProperty(item) && (String(item) !== 'id')) {
        let used = quotaItems[item].in_use,
            limit = quotaItems[item].limit,
            left,
            title,
            pbUsed, // progressbar used
            pbLeft; // progressbar left

        //title = (quotaTitleName.hasOwnProperty(item)) ? quotaTitleName[item] : String(item);
        if (quotaTitleName.hasOwnProperty(item)) {
          title = quotaTitleName[item]
        } else {
          title = String(item);
        }

        console.log(title);
        if (limit < 0) {
          limit = '无限';
          left = '无限';
          pbUsed = '0%';
          pbLeft = '100%';
        } else {
          left = limit - used;
          pbUsed = (used / limit).toFixed(2) * 100;
          pbLeft = 100 - pbUsed;

          pbUsed = String(pbUsed) + '%';
          pbLeft = String(pbLeft) + '%';
        }


        quotaItemElements.push(
          <QuotaItem
            key={item}
            title={title}
            used={used}
            left={left}
            limit={limit}
            pbUsed={pbUsed}
            pbLeft={pbLeft}
          />
        )
      }
    }

    return (
      <div className={styles.container}>
        <p className={styles.header}>
          资源配额使用情况
        </p>
        <div className={styles.quota}>
          {quotaItemElements}
        </div>
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
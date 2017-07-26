import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumeTypes } from 'features/volume/actions/volumeTypeActions';
import { Table, Spin } from 'antd';
import styles from './style/VolumesTable.css';
import cx from 'classnames';

const tableHeaderName = {
  name: '名称',
  description: '描述',
  size: '大小',
  volume_type: '磁盘类型',
  status: '状态',
  attchments: '连接到 serverID 的设备',
  bootable: '可启动',
  disk_format: '磁盘格式'
};

class VolumesTable extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let keys = Object.keys(tableHeaderName);
    let columns = [], data = [];

    keys.forEach((key) => {
      let sorter;
      if (key === 'name') {
        sorter = (a, b) => a.name.length - b.name.length;
      }

      let render;
      if (key === 'status') {
        render = (text, record) => {
          return (
            <span>
              <i className={cx(
                {
                  [styles.creating]: text === 'creating',
                  [styles.available]: text === 'available'
                }
              )}>
              </i>
              {text}
            </span>
          )
        }
      }
      columns.push({
        title: tableHeaderName[key],
        dataIndex: key,
        sorter: sorter,
        render: render,
      })
    });

    let uniqueKey = 0;
    this.props.volumes.forEach((ele) => {
      let obj = {};
      obj['key'] = uniqueKey++;
      keys.forEach((key) => {
        obj[key] = ele[key]
      });

      data.push(obj);
    });

    if (this.props.loading) {
      return (
        <div>
          <Table className={styles.table}
                 columns={columns}
                 rowClassName={(record, index) => ('row' + index)}
                 dataSource={data} />
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
    loading: state.volume.volumes.loading,
    volumes: state.volume.volumes.volumes
  }
}

export default connect(mapStateToProps, null)(VolumesTable);

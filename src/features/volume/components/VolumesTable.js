import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumeTypes } from 'features/volume/actions/volumeTypeActions';
import { selectVolumes } from 'features/volume/actions/volumeActions';
import { Table, Spin } from 'antd';
import styles from './style/VolumesTable.css';
import cx from 'classnames';
import {
  VOLUME_STATUS,
  VOLUME_TABLE_HEADER,
  VOLUME_TYPE
} from 'features/volume/constants';

class VolumesTable extends Component {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    let selectedVolumes = [];
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        let index = this.props.volumes.findIndex(
          volume => (row.id === volume.id)
        );
        selectedVolumes.push(this.props.volumes[index])
      });
    }
    this.props.dispatch(selectVolumes(selectedVolumes));
  };

  render() {
    // 表格列的配置描述
    let columns = [];
    Object.keys(VOLUME_TABLE_HEADER).forEach(title => {

      // 表格列的排序函数
      // 表格列的渲染函数
      let sorter, render;
      if (title === 'name') {
        sorter = (a, b) => a.name.length - b.name.length;
      } else if (title === 'status') {
        render = (text) => {
          return (
            <span>
              <i className={cx(
                {
                  [styles.creating]: text === 'creating',
                  [styles.available]: text === 'available'
                }
              )}>
              </i>
              {VOLUME_STATUS[text]}
            </span>
          )
        }
      } else if (title === 'volume_type') {
        render = (text) => (<span>{VOLUME_TYPE[text]}</span>)
      } else if (title === 'bootable') {
        render = (text) => (<span>{text === 'true' ? '是' : '否'}</span>)
      } else if (title === 'attachments') {
        render = (text) => {
          let attachments = [];
          if (text.length > 0) {
            text.forEach(attachment => {
              let serverID = attachment['server_id'];
              let serverName = '';
              this.props.servers.forEach(server => {
                if (server.id === serverID) {
                  serverName = server.name;
                }
              });

              attachments.push(
                <span key={attachment['server_id']}>
                  {serverName}的
                  <span
                    style={{
                      'backgroundColor': '#268F3B',
                      'color': '#fff',
                      'padding': '2px 5px',
                      'borderRadius': '3px'
                    }}
                  >
                    {attachment['device']}
                  </span>
                </span>)
            })
          }
          return (<span>{attachments}</span>)
        };
      }

      columns.push({
        title: VOLUME_TABLE_HEADER[title],
        key: title,
        dataIndex: title,
        sorter: sorter,
        render: render
      });
    });

    // 表格数据数组
    let data = [];
    this.props.volumes.forEach((ele) => {
      data.push(ele);
    });

    // 表格行的选择功能的配置
    const rowSelection = {
      selectedRowKeys: this.props.selectedVolumes.map(item => item.id),
      onChange: this.onSelectChange
    };

    if (this.props.volumesLoading && this.props.serversLoading) {
      return (
        <Table className={styles.table}
               rowSelection={rowSelection}
               columns={columns}
               rowClassName={(record, index) => ('row' + index)}
               dataSource={data}
               rowKey='id'
        />
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
    volumesLoading: state.volume.volumes.loading,
    volumes: state.volume.volumes.volumes,
    selectedVolumes: state.volume.selectedVolumes,
    servers: state.instance.servers.servers,
    serversLoading: state.instance.servers.loading
  }
}

export default connect(mapStateToProps, null)(VolumesTable);

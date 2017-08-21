import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { uniqueArr } from 'app/commons/common';
import MoreOperate from 'components/more-operate';

import { getNetworks } from 'app/orm/neutron/network/actions';
import { getKeypairs } from 'app/orm/nova/keypair/actions';
import { getSecurityGroups } from 'app/orm/neutron/securityGroup/actions';
import { operateServer } from 'app/orm/nova/server/actions';

import { selectServersInfo, selectFlavors } from 'app/selectors/nova';
import { selectImages } from 'app/selectors/glance';

import { Table, Spin, Button, Modal, Menu, Dropdown, Icon } from 'antd';
import {
  INSTANCE_TABLE_COLUMN,
  INSTANCE_FIELD,
  INSTANCE_STATUS } from 'features/common/constants';

import CreateInstanceModal from './create-instance-modal';

import cx from 'classnames';

import commonStyles from 'features/common/styles.css';

class InstanceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createVisible: false,
      operate: {
        visible: false,
        type: '',
        title: '',
        notice: []
      },
      stop: [],
      start: [],
      selectedServers: [],
    }
  }

  // 操作云主机
  handleOperate = (params) => {
    let notice = [];
    if (params === 'start') {
      this.state.start.forEach(item => {
        notice.push(item.name);
      });
      notice = `你确定要启动云主机【${notice.join(',')}】吗？`;
      this.setState({
        operate: {
          visible: true,
          type: 'start',
          title: '启动云主机',
          notice,
        }
      })
    } else if (params === 'stop') {
      this.state.stop.forEach(item => {
        notice.push(item.name);
      });
      notice = `你确定要关闭云主机【${notice.join(',')}】吗？`;
      this.setState({
        operate: {
          visible: true,
          type: 'stop',
          title: '关闭云主机',
          notice,
        }
      })
    }
  };

  // 启动和关闭云主机的http请求
  handleOperateOk = () => {
    let operateType = this.state.operate.type;
    let serversID = [];
    if (operateType === 'start') {
      this.state.start.forEach(item => {
        serversID.push(item.id);
      });
      this.props.dispatch(operateServer('start', serversID))
    } else if (operateType === 'stop') {
      this.state.stop.forEach(item => {
        serversID.push(item.id);
      });
      this.props.dispatch(operateServer('stop', serversID))
    }
    this.removeSelectedServers();
  };

  // 关闭操作云主机的弹出框
  handleOperateCancel = () => {
    this.removeSelectedServers();
  };

  // 清空已选择云主机的列表项
  removeSelectedServers = () => {
    this.setState({
      operate: {
        visible: false,
        type: '',
        title: '',
        notice: []
      },
      stop: [],
      start: [],
      selectedServers: [],
    })
  };

  // 选择列表项时的处理函数
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    let stopArr = [];
    let startArr = [];
    let selectedServersArr = [];
    if (selectedRows.length) {
      selectedRows.forEach(item => {
        if (item.status === 'ACTIVE') {
          stopArr.push(item);
          selectedServersArr.push(item.id);
          this.setState({
            stop: stopArr,
            selectedServers: selectedServersArr,
          })
        } else if (item.status === 'SHUTOFF') {
          startArr.push(item);
          selectedServersArr.push(item.id);
          this.setState({
            start: startArr,
            selectedServers: selectedServersArr,
          })
        }
      })
    } else {
      this.setState({
        stop: stopArr,
        start: startArr,
        selectedServers: selectedServersArr
      })
    }
  };



  // 创建云主机
  handleCreate = () => {
    this.props.dispatch(getNetworks());
    this.props.dispatch(getKeypairs());
    this.props.dispatch(getSecurityGroups());

    this.handleModalVisible('create', true);
  };

  // 创建云主机的弹出框
  handleModalVisible = (modal, visible) => {
    if (modal === 'create') {
      this.setState({
        createVisible: visible
      })
    }
  };

  //
  render() {
    if (this.props.servers.loading ||
      this.props.flavors.loading ||
      this.props.images.loading) {
      return (
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
      )
    } else {
      // 列表项选择配置
      const rowSelection = {
        selectedRowKeys: this.state.selectedServers,
        onChange: this.handleSelectChange,
      };

      // 表格列的描述数据
      let columns = [];
      INSTANCE_TABLE_COLUMN.forEach(title => {
        let sorter, render, className;
        if (title === 'name') {
          sorter = (a, b) => a.name.length - b.name.length;
          render = (text, record) => {
            return (
              <Link to={"/console/instances/" + record.id}>
                <span>{text}</span>
              </Link>
            )
          }
        } else if (title === 'security_groups') {
          render = (text) => {
            if (text) {
              let sgArr = text.map(sg => sg.name);
              sgArr = uniqueArr(sgArr);
              return (
                <div>{sgArr.join(',')}</div>
              )
            } else {
              return (
                <div>-</div>
              )
            }
          }
        } else if (title === 'addresses') {
          render = (text) => {
            if (text) {
              let ipNames = Object.keys(text);
              let ipArrs = [];
              ipNames.forEach(name => {
                ipArrs.push(<div key={name}>
                  <span>{name}: </span>
                  <span>{text[name][0].addr}</span>
                </div>)
              });
              return (
                <div>{ipArrs}</div>
              )
            } else {
              return (
                <div>无</div>
              )
            }
          }
        } else if (title === 'status') {
          render = (text) => {
            return (
              <span>
                <i className={cx(
                  {
                    [commonStyles.active]: text === 'ACTIVE',
                    [commonStyles.shutoff]: text === 'SHUTOFF',
                    [commonStyles.build]: text === 'BUILD'
                  }
                )}>
                </i>
                <i>{INSTANCE_STATUS[text]}</i>
              </span>
            )
          }
        } else if (title === 'created') {
          className = commonStyles.time;
        }

        columns.push({
          title: INSTANCE_FIELD[title],
          key: title,
          dataIndex: title,
          sorter: sorter,
          render: render,
          className: className,
        })
      });


      // 表格数据
      let serversData = this.props.servers.data;
      let flavorsData = this.props.flavors.data;
      let imagesData = this.props.images.data;
      let flavorIndex;
      let imagesIndex;
      let dataArrs = [];
      serversData.forEach((ele) => {
        let data = {};
        INSTANCE_TABLE_COLUMN.forEach(item => {
          data['id'] = ele['id'];
          if (item === 'flavor') {
            flavorIndex = flavorsData.findIndex(flavor => flavor.id === ele.flavor.id);
            data[item] = flavorsData[flavorIndex].name;
          } else if (item === 'image') {
            imagesIndex = imagesData.findIndex(image => image.id === ele.image.id);
            data[item] = imagesData[imagesIndex].name;
          } else if (item === 'status') {
            data[item] = ele.status;
          } else if (item === 'created') {
            data[item] = moment(ele[item]).format('YYYY-MM-DD HH:mm:ss');
          } else {
            data[item] = ele[item];
          }
        });
        dataArrs.push(data);
      });

      const menu = (
        <Menu>
          <Menu.Item
            key="mount"
            disabled={true}
          >
            <i className="fa fa-laptop">删除云主机</i>
          </Menu.Item>
        </Menu>
      );

      //
      return (
        <div className={commonStyles.wrapper}>
          <div className={commonStyles.toolbar}>


            {/*创建云主机的对话框*/}
            <CreateInstanceModal
              visible={this.state.createVisible}
              handleModalCancel={this.handleModalVisible}
            />

            <Button
              type="primary"
              icon="plus"
              onClick={this.handleCreate}
              className={commonStyles.button}
            >
              创建
            </Button>


            {/*启动和关闭云主机的对话框*/}
            <Modal
              title={this.state.operate.title}
              visible={this.state.operate.visible}
              onOk={this.handleOperateOk}
              onCancel={this.handleOperateCancel}
            >
              <p>{this.state.operate.notice}</p>
            </Modal>

            <Button
              type="primary"
              disabled={!this.state.start.length}
              icon="caret-right"
              onClick={() => this.handleOperate('start')}
              className={commonStyles.button}
            >
              启动
            </Button>

            <Button
              type="primary"
              disabled={!this.state.stop.length}
              icon="poweroff"
              onClick={() => this.handleOperate('stop')}
              className={commonStyles.button}
            >
              关机
            </Button>

            <MoreOperate
              menu={menu}
            />

          </div>

          <Table
            rowSelection={rowSelection}
            bordered
            size="middle"
            columns={columns}
            dataSource={dataArrs}
            rowKey='id'
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  servers: selectServersInfo(state),
  flavors: selectFlavors(state),
  images: selectImages(state)
});

export default connect(mapStateToProps, null)(InstanceTable);
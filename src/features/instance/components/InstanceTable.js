import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNetworks } from 'app/orm/neutron/network/actions';
import { getKeypairs } from 'app/orm/nova/keypair/actions';
import { getSecurityGroups } from 'app/orm/neutron/securityGroup/actions';

import { selectServers, selectFlavors } from 'app/selectors/nova';
import { selectImages } from 'app/selectors/glance';

import { Table, Spin, Button } from 'antd';
import { INSTANCE_TABLE_COLUMN, INSTANCE_FIELD, INSTANCE_STATUS } from 'features/common/constants';

import CreateInstanceModal from './create-instance-modal';

import commonStyles from 'features/common/styles.css';

class InstanceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createVisible: false,
    }
  }

  handleButtonClick = () => {
    this.props.dispatch(getNetworks());
    this.props.dispatch(getKeypairs());
    this.props.dispatch(getSecurityGroups());

    this.handleModalVisible('create', true);
  };

  handleModalVisible = (modal, visible) => {
    if (modal === 'create') {
      this.setState({
        createVisible: visible
      })
    }
  };

  render() {
    if (this.props.servers.loading ||
      this.props.flavors.loading ||
      this.props.images.loading) {

      return (
        <Spin />
      )

    } else {

      let columns = [];
      INSTANCE_TABLE_COLUMN.forEach(title => {
        //
        let sorter, render, className;
        if (title === 'name') {
          sorter = (a, b) => a.name.length - b.name.length;
          render = (text, record) => {
            return (
              <Link to={"/console/instance/" + record.id}>
                <span>{text}</span>
              </Link>
            )
          }
        } else if (title === 'security_groups') {
          render = (text) => {
            if (text) {
              // 数组去重
              let sgArr = text.map(sg => sg.name);
              sgArr = sgArr.filter((item, index, arr) => arr.indexOf(item) === index);
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

      //
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
            data[item] = INSTANCE_STATUS[ele.status];
          } else if (item === 'created') {
            data[item] = moment(ele[item]).format('YYYY-MM-DD HH:mm:ss');
          } else {
            data[item] = ele[item];
          }
        });
        dataArrs.push(data);
      });

      return (
        <div className={commonStyles.wrapper}>

          <div className={commonStyles.toolbar}>
            <Button
              onClick={this.handleButtonClick}
              type="primary"
              icon="plus">
              创建
            </Button>
          </div>

          <CreateInstanceModal
            visible={this.state.createVisible}
            handleModalCancel={this.handleModalVisible}
          />

          <Table
            className={commonStyles.table}
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
  servers: selectServers(state),
  flavors: selectFlavors(state),
  images: selectImages(state)
});

export default connect(mapStateToProps, null)(InstanceTable);
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImages } from 'app/orm/glance/image/actions';
import { selectServers } from 'app/selectors/nova';
import { Table, Spin, Button } from 'antd';
import {
  INSTANCE_TABLE_COLUMN,
  INSTANCE_FIELD,
} from 'features/instance/constants';

import CreateInstanceModal from './CreateInstanceModal';

import styles from './style/InstanceTable.css';

class InstanceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createVisible: false,
    }
  }

  handleButtonClick = () => {
    this.props.dispatch(getImages());
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
    //
    let columns = [];
    INSTANCE_TABLE_COLUMN.forEach(title => {
      //
      let sorter, render;
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
          return (
            <div>{text.map(sg => sg.name).join(',')}</div>
          )
        }
      }

      columns.push({
        title: INSTANCE_FIELD[title],
        key: title,
        dataIndex: title,
        sorter: sorter,
        render: render
      })
    });

    //
    let data = [];
    this.props.servers.data.forEach((ele) => {
      data.push(ele);
    });

    if (this.props.servers.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <div>
          <Button
            onClick={this.handleButtonClick}
            type="primary"
            icon="plus">
            创建
          </Button>

          <CreateInstanceModal
            visible={this.state.createVisible}
            handleModalCancel={this.handleModalVisible}
          />

          <Table className={styles.table}
                 columns={columns}
                 dataSource={data}
                 rowKey='id'
          />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    servers: selectServers(state)
  }
}

export default connect(mapStateToProps, null)(InstanceTable);
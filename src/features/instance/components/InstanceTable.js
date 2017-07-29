import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { INSTANCE_TABLE_HEADER } from 'features/instance/constants';
import styles from './style/InstanceTable.css';

class InstanceTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //
    let columns = [];
    Object.keys(INSTANCE_TABLE_HEADER).forEach((title) => {

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
      }

      columns.push({
        title: INSTANCE_TABLE_HEADER[title],
        key: title,
        dataIndex: title,
        sorter: sorter,
        render: render
      })
    });

    //
    let data = [];
    this.props.servers.forEach((ele) => {
      data.push(ele);
    });

    if (this.props.serversLoading) {
      return (
        <Table className={styles.table}
               columns={columns}
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
    serversLoading: state.instance.servers.loading,
    servers: state.instance.servers.servers
  }
}

export default connect(mapStateToProps, null)(InstanceTable);
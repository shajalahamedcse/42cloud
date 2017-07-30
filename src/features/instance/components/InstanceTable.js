import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import {
  INSTANCE_TABLE_COLUMN,
  INSTANCE_FIELD,
} from 'features/instance/constants';

import styles from './style/InstanceTable.css';

class InstanceTable extends Component {
  constructor(props) {
    super(props);
  }

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
    this.props.servers.forEach((ele) => {
      data.push(ele);
    });

    if (this.props.loading) {
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
    loading: state.orm.nova.servers.loading,
    servers: state.orm.nova.servers.data,
  }
}

export default connect(mapStateToProps, null)(InstanceTable);
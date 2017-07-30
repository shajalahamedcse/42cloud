import React, { Component } from 'react';
import { connect } from 'react-redux';
import Limit from './limit/Limit';
import Quota from './quota/Quota';
import Usage from './usage/Usage';
import { Row, Col } from 'antd';

import { getProjectQuota } from 'app/orm/nova/quota/actions';

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getProjectQuota());
  }

  render() {
    return (
      <div>
        <Row style={{margin: '10px 10px 0 15px'}} gutter={20}>
          <Col span={24}>
            <Limit />
          </Col>
        </Row>
        <Row style={{margin: '10px 10px 0 15px'}} gutter={20}>
          <Col xs={24} md={8}>
            <Quota />
          </Col>
          <Col xs={24} md={16}>
            <Usage />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, null)(Overview);
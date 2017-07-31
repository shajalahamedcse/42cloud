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
          <Col sm={24} md={17}>
            <Limit />
            <Usage />
          </Col>
          <Col sm={24} md={7}>
            <Quota />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, null)(Overview);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Limit from './limit/Limit';
import Quota from './quota/Quota';
import Usage from './usage/Usage';
import { Row, Col } from 'antd';

import { getProjectQuota } from 'features/overview/actions';

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getProjectQuota());
  }

  render() {
    return (
      <Row style={{margin: '10px 0 0 10px'}} gutter={20}>
        <Col sm={10} lg={5}>
          <Limit />
        </Col>
        <Col sm={8} lg={8}>
          <Quota />
        </Col>
        <Col sm={6} lg={11}>
          <Usage />
        </Col>
      </Row>
    )
  }
}

export default connect(null, null)(Overview);
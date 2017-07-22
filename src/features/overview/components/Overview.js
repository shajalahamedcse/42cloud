import React, { Component } from 'react';
import { connect } from 'react-redux';
import Usage from './limit/Limit';
import Quota from './quota/Quota';
import ShowTimeline from './timeline/Timeline';
import Compute from './usage/Usage';
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
      <Row style={{margin: '20px 20px 0 20px'}} gutter={20}>
        <Col xs={24} sm={16} lg={18}>
          <Usage />
          <Row style={{marginTop: '20px'}} gutter={20}>
            <Col sm={24} lg={10}>
              <Quota />
            </Col>
            <Col sm={24} lg={14}>
              <Compute />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <ShowTimeline />
        </Col>
      </Row>
    )
  }
}

export default connect(null, null)(Overview);
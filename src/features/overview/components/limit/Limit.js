import React from 'react';
import { connect } from 'react-redux';
import LimitCard from './LimitCard';
import { Spin, Row, Col } from 'antd';

class Limit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <Row gutter={20}>
          <Col xs={12} md={12} xl={6}>
          <LimitCard data={this.props.quotaSet.instances}
                     colorKey='instances'
                     kind="云主机"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={this.props.quotaSet.cores}
                     colorKey='cores'
                     kind="CPU核"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={this.props.quotaSet.ram}
                     colorKey='ram'
                     kind="内存"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={this.props.quotaSet.ram}
                     colorKey='ram'
                     kind="内存"
          />
          </Col>
        </Row>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    quotaSet: state.orm.nova.quotaSet.data,
    loading: state.orm.nova.quotaSet.loading,
  }

}
export default connect(mapStateToProps, null)(Limit);
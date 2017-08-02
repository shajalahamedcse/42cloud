import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstanceDetailOverview from './InstanceDetailOverview';
import { Row, Col } from 'antd';

import { getServerInfo } from 'app/orm/nova/server/actions';
import { getFlavorsInfo } from 'app/orm/nova/flavor/actions';
import { getImages } from 'app/orm/glance/image/actions';

import InstanceDetailTabs from './InstanceDetailTabs';

import styles from './style/InstanceDetail.css';

class InstanceDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.dispatch(getServerInfo(this.props.match.params.id));
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavorsInfo());
    return (
      <div>
        <InstanceDetailOverview />
        <InstanceDetailTabs
          instanceID={this.props.match.params.id}
          className={styles.detailtabs} />
      </div>
    )
  }
}

export default connect(null, null)(InstanceDetail);
import React from 'react';
import { connect } from 'react-redux';
import DetailOverview from './DetailOverview';
import DetailTabs from 'features/router/components/detail-tabs';
import { getRouterInfo } from 'app/orm/neutron/router/actions';
import { getRouterPorts } from 'app/orm/neutron/port/actions';

import styles from './style/RouterDetail.css'

class RouterDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getRouterInfo(this.props.match.params.id));
    this.props.dispatch(getRouterPorts(this.props.match.params.id));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <DetailOverview />
        <DetailTabs />
      </div>
    )
  }
}

export default connect(null, null)(RouterDetail);
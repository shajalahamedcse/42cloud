import React from 'react';
import { connect } from 'react-redux';
import NetworkTopology from './components/NetworkTopology'
import { getServersInfo } from 'app/orm/nova/server/actions';
import { getNetworks } from 'app/orm/neutron/network/actions';

import styles from './index.css';

class VPC extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getServersInfo());
    this.props.dispatch(getNetworks());
  }

  render () {
    return (
      <div className={styles.vpc}>
        <NetworkTopology />
      </div>
    )
  }
}

export default connect(null, null)(VPC);
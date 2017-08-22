import React from 'react';
import { connect } from 'react-redux';
import DetailOverview from './DetailOverview';
import { getServerInfo } from 'app/orm/nova/server/actions';
import { getFlavorsInfo } from 'app/orm/nova/flavor/actions';
import { getImages } from 'app/orm/glance/image/actions';
import { fetchConsoleOutput } from 'app/orm/nova/server/actions';
import DetailTabs from './detail-tabs';

import styles from './style/InstanceDetail.css';

class InstanceDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getServerInfo(this.props.match.params.id));
    this.props.dispatch(fetchConsoleOutput(this.props.match.params.id));
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavorsInfo());
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <DetailOverview />
        <DetailTabs instanceID={this.props.match.params.id} />
      </div>
    )
  }
}

export default connect(null, null)(InstanceDetail);
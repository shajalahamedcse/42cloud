import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstanceOverview from './InstanceOverview';

import { getServerInfo } from 'app/orm/nova/server/actions';
import { getFlavorsInfo } from 'app/orm/nova/flavor/actions';
import { getImages } from 'app/orm/glance/image/actions';

class InstanceDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.dispatch(getServerInfo(this.props.match.params.id));
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavorsInfo());
    return (
      <InstanceOverview />
    )
  }
}

export default connect(null, null)(InstanceDetail);
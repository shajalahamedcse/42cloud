import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getServers, getServer } from 'app/orm/nova/server/actions';
import { getImages } from 'app/orm/glance/image/actions';
import { getFlavorsInfo } from 'app/orm/nova/flavor/actions';

import InstanceHome from 'features/instance/components/instance-home';
import InstanceDetail from 'features/instance/components/instance-detail';

class Instance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getServers());
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavorsInfo());
  }

  render() {
    return (
      <div>
        <Route
          path="/console/instances"
          exact
          component={InstanceHome}
        />

        <Route
          path="/console/instances/:id"
          exact
          component={InstanceDetail}
        />
      </div>
    )
  }
}

export default connect(null, null)(Instance);
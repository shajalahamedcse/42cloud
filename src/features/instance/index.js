import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getServersInfo, getServer } from 'app/orm/nova/server/actions';
import { getImages } from 'app/orm/glance/image/actions';
import { getFlavorsInfo } from 'app/orm/nova/flavor/actions';

import InstanceTable from 'features/instance/components/InstanceTable';
import InstanceDetail from 'features/instance/components/InstanceDetail';

class Instance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getServersInfo());
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavorsInfo());
  }

  render() {
    return (
      <div>
        <Route
          path="/console/instance"
          exact
          component={InstanceTable}
        />

        <Route
          path="/console/instance/:id"
          exact
          component={InstanceDetail}
        />
      </div>
    )
  }
}

export default connect(null, null)(Instance);
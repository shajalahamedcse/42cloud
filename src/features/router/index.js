import React from 'react';
import { connect } from 'react-redux';
import RouterTable from './components/RouterTable';
import { getRouters } from 'app/orm/neutron/router/actions';

import commonStyles from 'features/common/styles.css'

class Router extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getRouters());
  }

  render() {
    return(
      <div className={commonStyles.wrapper}>
        <RouterTable />
      </div>
    )
  }
}

export default connect(null, null)(Router);
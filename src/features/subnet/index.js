import React from 'react';
import { connect } from 'react-redux';
import { getSubnets } from 'app/orm/neutron/subnet/actions';
import SubnetTable from './components/SubnetTable';

import commonStyles from 'features/common/styles.css';

class Subnet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getSubnets());
  }

  render() {
    return (
      <div
        className={commonStyles.wrapper}
      >
        <SubnetTable />
      </div>
    )
  }
}

export default connect(null, null)(Subnet);
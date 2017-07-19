import React, { Component } from 'react';
import { connect } from 'react-redux';
import Usage from './usage/Usage';
import Quota from './quota/Quota';

import { getProjectQuota } from 'features/overview/actions';

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getProjectQuota());
  }

  render() {
    return (
      <div>
        <Usage />
        <Quota />
      </div>
    )
  }
}

export default connect(null, null)(Overview);
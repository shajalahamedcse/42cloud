import React, { Component } from 'react';
import { connect } from 'react-redux';
import Usage from './usage/Usage';
import Quota from './quota/Quota';
import Timeline from './timeline/Timeline';
import Compute from './compute/Compute';

import { getProjectQuota } from 'features/overview/actions';

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getProjectQuota());
  }

  render() {
    return (
      <div style={{display: 'flex',
                   marginTop: '10px', border: '1px solid #cdcdcd'}}>
        <div style={{border: '1px solid #cdcdcd'}}>
          <Usage />
          <div style={{display: 'flex',
            marginTop: '10px', border: '1px solid #cdcdcd'}}>
            <Quota />
            <Compute />
          </div>
        </div>
        <Timeline />
      </div>
    )
  }
}

export default connect(null, null)(Overview);
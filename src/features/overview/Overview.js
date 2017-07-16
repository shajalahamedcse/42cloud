import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants';

const fetchServers = (data) => {
  data.token.catalog.forEach((items) => {
    if (items.type === 'compute') {
      items.endpoints.forEach((item) => {
        if (item.interface === 'public') {
          let parser = document.createElement('a');
          parser.href = item.url;
          localStorage.setItem('computePrefix', parser.pathname);
        }
      })
    }
  });
  const computePrefix = localStorage.getItem('computePrefix');
  const fetchURL = constants.OS_COMPUTE + computePrefix + path.getServers;
};

class Overview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Hello Overview</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    values: state
  }
};

export default connect(mapStateToProps, null)(Overview);
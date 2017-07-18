import React, { Component } from 'react';
import { connect } from 'react-redux';
import Usage from './usage/Usage';
import { getProjectUsage } from 'features/overview/actions';
import { loadTokenData } from 'app/commons/common';

class Overview extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let scopedToken = localStorage.getItem('scopedToken');
    let urlPrefix = localStorage.getItem('urlPrefix');
    this.props.dispatch(getProjectUsage());
  }


  render() {
    return (
      <Usage />
    )
  }
}

export default connect(null, null)(Overview);
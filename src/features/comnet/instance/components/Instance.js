import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServersInfo } from '../actions';
import Usage from './usage/Usage';

class Instance extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getServersInfo());
  }

  render() {
    return (
      <Usage />
    )
  }
}

export default connect(null, null)(Instance);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumesInfo } from '../actions';
import Usage from './usage/Usage';

class Volume extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getVolumesInfo());
  }

  render() {
    return (
      <Usage />
    )
  }
}

export default connect(null, null)(Volume);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImages } from '../actions';
import Usage from './usage/Usage';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getImages());
  }

  render() {
    return (
      <Usage />
    )
  }
}

export default connect(null, null)(Image);
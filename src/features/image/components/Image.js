import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImages } from 'app/orm/glance/image/actions';
import ImageTable from 'features/image/components/ImageTable';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getImages());
  }

  render() {
    return (
      <ImageTable />
    )
  }
}

export default connect(null, null)(Image);
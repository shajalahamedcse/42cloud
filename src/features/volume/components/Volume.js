import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumesInfo } from 'features/volume/actions/volumeActions';
import VolumesToolbar from 'features/volume/components/VolumesToolbar';
import VolumesTable from 'features/volume/components/VolumesTable';

class Volume extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getVolumesInfo());
  }

  render() {
    return (
      <div>
        <VolumesToolbar />
        <VolumesTable />
      </div>
    )
  }
}

export default connect(null, null)(Volume);
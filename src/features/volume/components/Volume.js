import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumesInfo } from 'features/volume/actions/volumeActions';
import { getServersInfo } from 'features/instance/actions';
import VolumesTable from 'features/volume/components/VolumesTable';

import CreateVolumeButton from 'features/volume/components/CreateVolumeButton';
import MoreVolumeButton from 'features/volume/components/MoreVolumeButton';

import CreateVolumeModal from 'features/volume/components/CreateVolumeModal';
import DeleteVolumeModal from 'features/volume/components/DeleteVolumeModal';
import ModifyVolumeModal from 'features/volume/components/ModifyVolumeModal';
import ResizeVolumeModal from 'features/volume/components/ResizeVolumeModal';

class Volume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createVisible: false,
      deleteVisible: false,
      modifyVisible: false,
      resizeVisible: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(getVolumesInfo());
    this.props.dispatch(getServersInfo());
  }

  handleModalVisible = (modal, visible) => {
    if (modal === 'create') {
      this.setState({
        createVisible: visible
      })
    }

    if (modal === 'delete') {
      this.setState({
        deleteVisible: visible
      })
    }

    if (modal === 'modify') {
      this.setState({
        modifyVisible: visible
      })
    }

    if (modal === 'resize') {
      this.setState({
        resizeVisible: visible
      })
    }
  }


  render() {
    return (
      <div>
        <CreateVolumeButton
          handleClick={this.handleModalVisible}
        />

        <MoreVolumeButton
          handleClick={this.handleModalVisible}
        />

        <CreateVolumeModal
          visible={this.state.createVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <ModifyVolumeModal
          visible={this.state.modifyVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <ResizeVolumeModal
          visible={this.state.resizeVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <DeleteVolumeModal
          visible={this.state.deleteVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <VolumesTable />
      </div>
    )
  }
}

export default connect(null, null)(Volume);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { getVolumesInfo } from 'app/orm/cinder/volume/actions';
import { getServersInfo } from 'app/orm/nova/server/actions';

import VolumesTable from 'features/volume/components/VolumesTable';
import MoreVolumeButton from 'features/volume/components/MoreVolumeButton';
import CreateVolumeModal from 'features/volume/components/CreateVolumeModal';
import DeleteVolumeModal from 'features/volume/components/DeleteVolumeModal';
import ModifyVolumeModal from 'features/volume/components/ModifyVolumeModal';
import ResizeVolumeModal from 'features/volume/components/ResizeVolumeModal';

import styles from './style/VolumesTable.css';

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

  handleButtonClick = () => {
    this.handleModalVisible('create', true)
  };

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
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleButtonClick}
                type="primary"
                className={styles.toolbar}
                icon="plus">
          创建
        </Button>

        <CreateVolumeModal
          visible={this.state.createVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <MoreVolumeButton
          handleClick={this.handleModalVisible}
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
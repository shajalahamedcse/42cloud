import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumeTypes } from 'features/volume/actions/volumeTypeActions';
import styles from './style/VolumesTable.css';
import { Button } from 'antd';
import CreateVolumeForm from './CreateVolumeForm';

class CreateVolumeButton extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      visible: false
    }
  }

  showModal() {
    this.props.dispatch(getVolumeTypes());
    this.setState({
      visible: true
    })
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}
                type="primary"
                className={styles.toolbar}
                icon="plus">
          创建
        </Button>

        <CreateVolumeForm
          visible={this.state.visible}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }
}

export default connect(null, null)(CreateVolumeButton);

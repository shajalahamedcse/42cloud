import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVolumeTypes } from 'app/orm/cinder/volumeType/actions';
import styles from './style/VolumesTable.css';
import { Button } from 'antd';

class CreateVolumeButton extends Component {
  constructor(props) {
    super(props);
  }

  handleButtonClick = () => {
    this.props.handleClick('create', true)
  }

  render() {
    return (
      <span>
        <Button onClick={this.handleButtonClick}
                type="primary"
                className={styles.toolbar}
                icon="plus">
          创建
        </Button>
      </span>
    )
  }
}

export default connect(null, null)(CreateVolumeButton);

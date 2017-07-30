import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Alert } from 'antd';
import { deleteVolume } from 'app/orm/cinder/volume/actions';
import { selectVolumes } from 'features/volume/actions';


class DeleteVolumeModal extends Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    this.props.dispatch(deleteVolume(this.props.selectedVolumes));
    this.handleCancel();
    this.props.dispatch(selectVolumes([]));
  }

  handleCancel = () => {
    this.props.handleModalCancel('delete', false)
  }

  render() {
    let namesArr = [];
    if (this.props.selectedVolumes.length > 0) {
      this.props.selectedVolumes.forEach((ele) => {
        namesArr.push(ele.name);
      })
    }

    return(
      <Modal title="删除硬盘"
             okText="删除"
             onCancel={this.handleCancel}
             visible={this.props.visible}
             onOk={this.handleOk}
      >

        <Alert
          message="Warning"
          description={`你选择了硬盘【${namesArr}】，确定要删除吗?`}
          type="warning"
          showIcon
        />

      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedVolumes: state.features.volume.selectedVolumes,
  }
}
export default connect(mapStateToProps, null)(DeleteVolumeModal);
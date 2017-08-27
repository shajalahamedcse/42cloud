import React from 'react';
import { Modal, Input } from 'antd';

class EditInstanceModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCancel = () => {
    this.props.handleModalCancel('edit', false);
  };

  handleOk = () => {
  };

  render() {
    return (
      <Modal
        title="编辑云主机"
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Input />
      </Modal>
    )
  }
}

export default EditInstanceModal;
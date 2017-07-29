import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateVolume, selectVolumes } from 'features/volume/actions/volumeActions';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class ModifyVolumeModal extends Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    let reqBody = this.props.form.getFieldsValue();
    this.props.dispatch(updateVolume(reqBody, this.props.selectedVolumes[0]));
    this.handleCancel();
    this.props.dispatch(selectVolumes([]));
  }

  handleCancel = () => {
    this.props.handleModalCancel('modify', false)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title="修改硬盘的信息"
             okText="修改"
             visible={this.props.visible}
             onCancel={this.handleCancel}
             onOk={this.handleOk}
      >
        <Form layout="inline">
          <FormItem label="名称：">
            {getFieldDecorator('name')(<Input />)}
          </FormItem>

          <FormItem label="描述：">
            {getFieldDecorator('description')(<TextArea />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
ModifyVolumeModal = Form.create()(ModifyVolumeModal);

function mapStateToProps(state) {
  return {
    selectedVolumes: state.volume.selectedVolumes
  }
}
export default connect(mapStateToProps, null)(ModifyVolumeModal);
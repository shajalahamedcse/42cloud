import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateVolume, selectVolumesSuccess } from 'features/volume/actions/volumeActions';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class ModifyVolumeForm extends Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    let reqBody = this.props.form.getFieldsValue();
    console.log(this.props.selectedVolumes);
    this.props.dispatch(updateVolume(reqBody, this.props.selectedVolumes[0]));
    this.props.onCancel();
    this.props.dispatch(selectVolumesSuccess([]))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title="修改硬盘的信息"
             visible={this.props.visible}
             onCancel={this.props.onCancel}
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

ModifyVolumeForm = Form.create()(ModifyVolumeForm);

export default connect(null, null)(ModifyVolumeForm);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, Radio } from 'antd';
import { createVolume } from 'app/orm/cinder/volume/actions';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

class CustomizeForm extends Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    let reqBody = this.props.form.getFieldsValue();
    this.props.dispatch(createVolume(reqBody));
    this.handleCancel();
  }

  handleCancel = () => {
    this.props.handleModalCancel('create', false)
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    let radioElements = [];
    if (this.props.loading) {
      this.props.volumeTypes.forEach((ele) => {
        radioElements.push(
          <Radio key={ele.name}>{ele.name}</Radio>
        )
      })
    } else {
      radioElements.push(
        <Radio key={1}>A</Radio>
      )
    }

    return (
      <Modal title="创建硬盘"
             width="450px"
             okText="创建"
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

          <FormItem label="类型：">
            {getFieldDecorator('type')(
              <RadioGroup>
                {radioElements}
              </RadioGroup>
            )}
          </FormItem>

          <FormItem label="容量：">
            {getFieldDecorator('size', {initialValue: 1})(
              <InputNumber min={1} max={10} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.orm.cinder.volumeTypes.loading,
    volumeTypes: state.orm.cinder.volumeTypes.data
  }
}

let CreateVolumeModal = Form.create()(CustomizeForm);
export default connect(mapStateToProps, null)(CreateVolumeModal);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio, Spin } from 'antd';
import { createVolume } from 'app/orm/cinder/volume/actions';
import { selectVolumeTypes } from 'app/selectors/cinder';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

class CustomizeForm extends Component {
  constructor(props) {
    super(props);
  }

  handleOk = () => {
    let reqBody = this.props.form.getFieldsValue();
    this.props.dispatch(createVolume(reqBody));
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.handleModalCancel('create', false)
  };

  render() {
    const { getFieldDecorator } = this.props.form;


    if (this.props.volumeTypes.loading) {
      return (
        <Spin />
      )
    } else {
      let radioElements = [];
      this.props.volumeTypes.data.forEach((ele) => {
        radioElements.push(
          <Radio key={ele.name}>{ele.name}</Radio>
        )
      });
      return (
        <Modal title="创建硬盘"
               width="450px"
               okText="创建"
               visible={this.props.visible}
               onCancel={this.handleCancel}
               onOk={this.handleOk}
        >
          <Form>
            <FormItem label="名称: ">
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>

            <FormItem label="描述：">
              {getFieldDecorator('description')(
                <TextArea />
              )}
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
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    volumeTypes: selectVolumeTypes(state)
  }
}

let CreateVolumeModal = Form.create()(CustomizeForm);
export default connect(mapStateToProps, null)(CreateVolumeModal);

import React from 'react';
import { connect } from 'react-redux';
import { resizeVolume } from 'app/orm/cinder/volume/actions';
import { choosedVolumes } from 'features/volume/actions';
import { Modal, Form, Input, Slider, InputNumber, Row, Col, Alert } from 'antd';
const FormItem = Form.Item;

class ResizeVolumeModal extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.state = {
      newSize: 1,
    }
  }

  onChange(value) {
    this.setState({
      newSize: value
    })
  }

  handleOk() {
    this.props.dispatch(
      resizeVolume(
        {'new_size': this.state.newSize},
        this.props.choosedVolumes[0]
      )
    );
    this.handleCancel();
    this.props.dispatch(choosedVolumes([]));
  }

  handleCancel = () => {
    this.props.handleModalCancel('resize', false)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let currentSize;
    if (this.props.choosedVolumes.length > 0) {
      currentSize = this.props.choosedVolumes[0].size;
      name = this.props.choosedVolumes[0].name;
    } else {
      currentSize = 1;
      name = '';
    }
    return(
      <Modal
        title="扩容硬盘"
        okText="扩容"
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Alert message="提示：仅限扩充容量，不支持减少容量"
               type="info"
               showIcon />

        <Form>
          <FormItem label="名称">
            {
              getFieldDecorator('name', {initialValue: name})
              (<Input disabled={true} />)
            }
          </FormItem>

          <FormItem label="当前容量">
            {
              getFieldDecorator('size', {initialValue: currentSize})
              (<Input disabled={true} />)
            }
          </FormItem>

          <FormItem label="新容量">
            {
              getFieldDecorator('new_size')
              (<Row>
                <Col span={12}>
                  <Slider
                    min={currentSize}
                    max={5}
                    onChange={this.onChange}
                    value={this.state.newSize}
                  />
                </Col>

                <Col span={4}>
                  <InputNumber
                    min={currentSize}
                    max={5}
                    style={{marginLeft: 20}}
                    onChange={this.onChange}
                    value={this.state.newSize}
                  />
                </Col>
              </Row>)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
ResizeVolumeModal = Form.create()(ResizeVolumeModal);

function mapStateToProps(state) {
  return {
    choosedVolumes: state.features.volume.choosedVolumes,
  }
}
export default connect(mapStateToProps, null)(ResizeVolumeModal);
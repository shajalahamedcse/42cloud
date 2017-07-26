import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, InputNumber, Radio } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;


class CreateVolumeForm extends Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    this.props.onCancel();
  }

  render() {
    let radioElements = [];
    if (this.props.loading) {
      this.props.volumeTypes.forEach((ele) => {
        radioElements.push(
          <Radio key={ele.name} value={ele.name}>{ele.name}</Radio>
        )
      })
    } else {
      radioElements.push(
        <Radio key={1} value={1}>A</Radio>
      )
    }

    return (
      <Modal title="创建硬盘"
             width="450px"
             visible={this.props.visible}
             onCancel={this.props.onCancel}
             onOk={this.handleOk}
      >
        <div style={{padding: '0 30px'}}>
          <div style={{margin: '10px 0'}}>
            <span>名称：</span>
            <Input style={{width: '60%'}} />
          </div>

          <div style={{margin: '10px 0'}}>
            <span>描述：</span>
            <TextArea style={{width: '60%'}} placeholder="描述硬盘信息" />
          </div>

          <div style={{margin: '10px 0'}}>
            <span>类型: </span>
            <RadioGroup>
              {radioElements}
            </RadioGroup>
          </div>

          <div style={{margin: '10px 0'}}>
            <span>容量：</span>
            <InputNumber min={1} max={10} defaultValue={3} />
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.volume.volumeTypes.loading,
    volumeTypes: state.volume.volumeTypes.volume_types
  }
}

export default connect(mapStateToProps, null)(CreateVolumeForm);

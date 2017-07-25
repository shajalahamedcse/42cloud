import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, InputNumber, Radio } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;


class CreateVolumeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal title="创建硬盘"
               width="450px"
               visible={this.props.visible}
               onCancel={this.props.onCancel}
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
                <Radio value={1}>A</Radio>
              </RadioGroup>
            </div>

            <div style={{margin: '10px 0'}}>
              <span>容量：</span>
              <InputNumber min={1} max={10} defaultValue={3} />
            </div>
          </div>
        </Modal>
      </div>
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

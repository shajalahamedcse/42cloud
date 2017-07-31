import React, { Component } from 'react';
import { Modal, Steps, Button } from 'antd';
import styles from './style/CreateInstanceModal.css'

import CreateInstanceStep1 from './CreateInstanceStep1';

const Step = Steps.Step;

class CreateInstanceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0
    }
  }

  handleCancel = () => {
    this.props.handleModalCancel('create', false);
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const steps = [{
      title: '选择镜像',
      content: <CreateInstanceStep1 />
    }, {
      title: '选择规格',
      content: '规格配置'
    }, {
      title: '选择网络',
      content: '网络'
    }, {
      title: '安全设置',
      content: '安全'
    }, {
      title: '确认',
      content: '完成创建'
    }];

    return (
      <Modal
        title="创建云主机"
        width="600px"
        footer={null}
        visible={this.props.visible}
        onCancel={this.handleCancel}
      >
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>

          <div className={styles.content}>
            {steps[this.state.current].content}
          </div>

          <div className={styles.action}>
            {
              this.state.current < steps.length - 1
              &&
              <Button
                className={styles.next}
                type="primary"
                onClick={() => this.next()}
              >
                下一步
              </Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button
                className={styles.confirm}
                type="primary"
                onClick={() => console.log('完成创建')}
              >
                完成
              </Button>
            }
            {
              this.state.current > 0
              &&
              <Button
                className={styles.prev}
                type="primary"
                onClick={() => this.prev()}
              >
                上一步
              </Button>
            }
          </div>
        </div>
      </Modal>
    )
  }
}

export default CreateInstanceModal;
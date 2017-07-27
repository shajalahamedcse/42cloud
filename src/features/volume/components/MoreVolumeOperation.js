import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Icon } from 'antd';
import ModifyVolumeForm from './ModifyVolumeForm';

class MoreVolumeOperation extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handelCancel = this.handelCancel.bind(this);

    this.state = {
      visible: false
    }
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  handelCancel() {
    this.setState({
      visible: false
    })
  }

  render() {
    let selectedVolumes = this.props.selectedVolumes;
    const menu = (
      <Menu>
        <Menu.Item key="1" disabled={selectedVolumes.length < 1}>
          <i className="fa fa-desktop">加载到硬盘</i>
        </Menu.Item>

        <Menu.Item disabled={selectedVolumes.length < 1} key="2">
          <i className="fa fa-desktop">卸载硬盘</i>
        </Menu.Item>

        <Menu.Item key="3" disabled={selectedVolumes.length !== 1}>
          <i className="fa fa-desktop">扩容</i>
        </Menu.Item>

        <Menu.Item key="4" disabled={selectedVolumes.length !== 1}>
          <i onClick={this.showModal}
             className="fa fa-desktop">修改</i>
        </Menu.Item>

        <Menu.Item key="5" disabled={selectedVolumes.length < 1}>
          <i onClick={this.showModal}
             className="fa fa-desktop">删除</i>
        </Menu.Item>
      </Menu>
    );

    return(
      <span>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="primary">
            更多操作<Icon type="down" />
          </Button>
        </Dropdown>

        <ModifyVolumeForm
          selectedVolumes={selectedVolumes}
          onCancel={this.handelCancel}
          visible={this.state.visible}
        />
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedVolumes: state.volume.selectedVolumes
  }
}

export default connect(mapStateToProps, null)(MoreVolumeOperation);
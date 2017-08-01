import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectNetworks } from 'app/selectors/neutron';
import { Spin, Row, Col } from 'antd';
import { addNetwork, removeNetwork } from 'features/instance/actions';

import styles from './style/network.css';

class Network extends Component {
  constructor(props) {
    super(props);
  }

  handleAddNetwork = (id) => {
    this.props.dispatch(addNetwork(id))
  }

  handleRemoveNetwork = (id) => {
    this.props.dispatch(removeNetwork(id));
  }


  render() {
    if (this.props.networks.loading) {
      return (
        <Spin />
      )
    } else {
      console.log(this.props.networks.data);
      let networks = this.props.networks.data;
      let networksID = networks.map(network => network.id);

      let availableNetworks = networksID.filter((ele) => {
        return this.props.choosedNetworks.indexOf(ele) < 0;
      });

      let availableNetworksNode = [];
      availableNetworks.forEach((ele) => {
        let index = networks.findIndex(network => network.id === ele);
        availableNetworksNode.push(
          <div
            onClick={() => this.handleAddNetwork(ele)}
            className={styles.network}
            key={ele}
          >
            <span>{networks[index].name}</span>
            <span className={styles.plus}>+</span>
          </div>
        )
      });

      let choosedNetworksNode = [];
      this.props.choosedNetworks.forEach((ele) => {
        let index = networks.findIndex(network => network.id === ele);
        choosedNetworksNode.push(
          <div
            onClick={() => this.handleRemoveNetwork(ele)}
            className={styles.network}
            key={ele}
          >
            <span>{networks[index].name}</span>
            <span className={styles.plus}>+</span>
          </div>
        )
      });

      return (
        <Row gutter={20}>
          <Col span={12}>
            <div>
              <span>可选网络</span>
              {availableNetworksNode}
            </div>
          </Col>
          <Col span={12}>
            <div>
              <span>已选网络</span>
              {choosedNetworksNode}
            </div>
          </Col>
        </Row>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  networks: selectNetworks(state),
  choosedNetworks: state.features.instance.create.choosedNetworks
});

export default connect(mapStateToProps, null)(Network);
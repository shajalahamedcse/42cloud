import React from 'react';
import { connect } from 'react-redux';
import { selectRouterInterfacePorts, selectSubnets } from 'app/selectors/neutron';
import { Spin } from 'antd';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.routerInterfacePorts.loading || this.props.subnets.loading) {
      return (
        <Spin />
      )
    } else {
      let interfacePortsArr = [];
      this.props.routerInterfacePorts.data.forEach(item => {
        item.fixed_ips.forEach(ip => {
          interfacePortsArr.push(ip.subnet_id);
        })
      });

      let subnetsArr = [];
      let subnetsData = this.props.subnets.data;
      subnetsData.forEach(item => {
        if (interfacePortsArr.indexOf(item.id) >= 0) {
          subnetsArr.push(item);
        }
      });

      let networkIDArr = [];
      subnetsArr.forEach(item => {
        networkIDArr.push(item.network_id);
      });

      console.log(networkIDArr);
      console.log(subnetsData);

      let networkNodeArr = [];
      networkIDArr.forEach(nID => {
        let subnetNodeArr = [];
        subnetsData.forEach(sData => {
          if (nID === sData.network_id) {
            subnetNodeArr.push(
              <div
                key={sData.network_id}
                style={{
                  'margin': '10px 0'
                }}
              >
                <span>{sData.id}</span>
                <span>{sData.cidr}</span>
              </div>
            )
          }
        });
        networkNodeArr.push(
          <div
            key={nID}
            style={{
              'border': '1px solid #ececec',
              'padding': '5px',
              'marginBottom': '30px'
            }}
          >
            {subnetNodeArr}
          </div>
        )
      });

      return (
        <div>
          {networkNodeArr}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  routerInterfacePorts: selectRouterInterfacePorts(state),
  subnets: selectSubnets(state)
});

export default connect(mapStateToProps, null)(Graph);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uniqueArr } from 'app/commons/common';
import instance from 'assets/images/instance.svg';
import router from 'assets/images/router.svg';

import {
  selectRouterInterfacePorts,
  selectSubnets,
  selectNetworks
} from 'app/selectors/neutron';

import { selectServersInfo } from 'app/selectors/nova';
import { Spin } from 'antd';

const instanceIconSize = '45px',
  instanceIconSep = '30px';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.routerInterfacePorts.loading ||
      this.props.subnets.loading ||
      this.props.serversInfo.loading ||
      this.props.networks.loading) {
      return (
        <Spin />
      )
    } else {
      // 网络上的云主机
      let serversInfoData = this.props.serversInfo.data;
      let networksData = this.props.networks.data;
      let mapNetworkIDToServer = {};

      networksData.forEach(network => {
        let serversArr = [];

        serversInfoData.forEach(server => {
          Object.keys(server.addresses).forEach(networkName => {
            if (networkName === network.name) {
              serversArr.push(server);
            }
          });
        });
        if (serversArr.length > 5) {
          serversArr = serversArr.splice(0, 5);
        }
        mapNetworkIDToServer[network.id] = serversArr;
      });
      console.log(mapNetworkIDToServer);


      // 内网端口
      let interfacePortsArr = [];
      this.props.routerInterfacePorts.data.forEach(item => {
        item.fixed_ips.forEach(ip => {
          interfacePortsArr.push(ip.subnet_id);
        })
      });


      // 子网
      let subnetsArr = [];
      let subnetsData = this.props.subnets.data;
      subnetsData.forEach(item => {
        if (interfacePortsArr.indexOf(item.id) >= 0) {
          subnetsArr.push(item);
        }
      });


      // 网络
      let networkIDArr = [];
      subnetsArr.forEach(item => {
        networkIDArr.push(item.network_id);
      });
      networkIDArr = uniqueArr(networkIDArr);


      // 网络、子网以及云主机
      let networkNodeArr = [];
      networkIDArr.forEach(networkID => {
        let subnetNodeArr = [];
        let serverNodeArr = [];

        mapNetworkIDToServer[networkID].forEach((server) => {
          serverNodeArr.push(
            <div
              key={server.id}
              style={{
                'float': 'left'
              }}
            >
              <Link to={"/console/instances/" + server.id}>
                <div
                  style={{
                    'overflow': 'hidden',
                    'textOverflow': 'ellipsis',
                    'width': instanceIconSize,
                    'whiteSpace': 'nowrap'
                  }}
                >
                  {server.name}
                </div>
              </Link>

              <div
                style={{
                  'width': instanceIconSize,
                  'height': instanceIconSize,
                  'display': 'inline-block',
                  'marginRight': instanceIconSep,
                  'backgroundImage': `url(${instance})`,
                  'backgroundSize': instanceIconSize,
                  'verticalAlign': 'bottom',
                }}
              >
              </div>
            </div>
          )
        });

        subnetsData.forEach(subnet => {
          if (networkID === subnet.network_id) {
            subnetNodeArr.push(
              <div
                key={subnet.id}
              >
                <span
                  style={{
                    'borderBottom': '5px solid #111',
                    'display': 'inline-block',
                    'width': '100px',
                    'position': 'relative',
                    'left': '-21px',
                    'bottom': '2px'
                  }}
                >
                </span>
                <span
                  style={{
                    'position': 'relative',
                    'left': '-16px',
                    'color': '#111'
                  }}
                >
                  {subnet.cidr}
                </span>
              </div>
            )
          }
        });

        networkNodeArr.push(
          <div
            key={networkID}
          >
            <div
              style={{
                'overflow': 'hidden'
              }}
            >
              {serverNodeArr}
            </div>
            <div
              style={{
                'border': '1px dashed #a7a7a7',
                'marginBottom': '50px',
                'padding': '10px 0'
              }}
            >
              {subnetNodeArr}
            </div>
          </div>
        )
      });

      return (
        <div
        >
          <div
            style={{
              'float': 'left',
              'width': '45px',
              'height': '45px',
              'backgroundImage': `url(${router})`,
              'backgroundSize': '45px 45xp',
              'transform': 'rotate(45deg)'
            }}
          >
          </div>
          <div
            style={{
              'float': 'left',
              'width': '50px',
              'position': 'relative',
              'top': '20px',
              'borderTop': '5px solid #111',
            }}
          >
          </div>

          <div
            style={{
              'float': 'left',
              'borderLeft': '5px solid #111',
              'padding': '20px'
            }}
          >
            {networkNodeArr}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  routerInterfacePorts: selectRouterInterfacePorts(state),
  subnets: selectSubnets(state),
  serversInfo: selectServersInfo(state),
  networks: selectNetworks(state)
});

export default connect(mapStateToProps, null)(Graph);
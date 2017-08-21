import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uniqueArr } from 'app/commons/common';
import instance from 'assets/images/instance.svg';
import router from 'assets/images/router.svg';
import { Tooltip } from 'antd';
import { INSTANCE_STATUS } from 'features/common/constants';

import {
  selectRouterInterfacePorts,
  selectSubnets,
  selectNetworks
} from 'app/selectors/neutron';

import { selectServersInfo } from 'app/selectors/nova';
import { Spin } from 'antd';

const instanceIconSize = '35px',
  instanceSep = '15px',
  routerIconSize = '60px';

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
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
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
          const content = (
            <div>
              <div>
                <span>名称：</span>
                <span>{server.name}</span>
              </div>
              <div>
                <span>状态：</span>
                <span>{INSTANCE_STATUS[server.status]}</span>
              </div>
            </div>
          );
          serverNodeArr.push(
            <div
              key={server.id}
              style={{
                'float': 'left',
                'margin': `0 ${instanceSep}`,
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

              <Tooltip placement="top" title={content}>
                <div
                  style={{
                    'width': instanceIconSize,
                    'height': instanceIconSize,
                    'display': 'inline-block',
                    'backgroundImage': `url(${instance})`,
                    'backgroundSize': instanceIconSize,
                    'verticalAlign': 'bottom',
                  }}
                >
                </div>
              </Tooltip>
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
                    'borderTop': '5px solid #111',
                    'display': 'inline-block',
                    'width': '100px',
                    'position': 'relative',
                    'left': '-21px',
                    'bottom': '2px'
                  }}
                >
                </span>
                <span>
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
                'border': '1px dotted #a7a7a7',
                'marginBottom': '50px',
                'padding': '10px 0',
                'backgroundColor': '#ececec'
              }}
            >
              {subnetNodeArr}
            </div>
          </div>
        )
      });

      return (
        <div
          style={{
            'overflow': 'hidden',
            'padding': '100px 50px'
          }}
        >
          <div
            style={{
              'float': 'left',
              'width': routerIconSize,
              'height': routerIconSize,
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
              'top': '28px',
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
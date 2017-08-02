import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectFlavors } from 'app/selectors/nova';
import { selectImages } from 'app/selectors/glance';
import { selectNetworks } from 'app/selectors/neutron';

function Profile(props) {
  let createInstance = props.createInstance;

  let imageName = '';
  props.images.data.forEach(ele => {
    if (ele.id === createInstance.choosedImage) {
      imageName = ele.name;
    }
  });

  let flavorName = '';
  props.flavors.data.forEach(ele => {
    if (ele.id === createInstance.choosedFlavor) {
      flavorName = ele.name;
    }
  });

  let networksNode = [];
  createInstance.choosedNetworks.forEach(ele => {
    props.networks.data.forEach(item => {
      if (item.id === ele) {
        networksNode.push(
          <span key={ele}>{item.name}</span>
        );
      }
    })
  });

  let securityGroupsNode = [];
  createInstance.choosedSecurityGroup.forEach(ele => {
    securityGroupsNode.push(
      <span key={ele}>{ele}</span>
    )
  });

  return (
    <div>
      <div>
        <span>主机名</span>
        <span>{createInstance.filledInstance}</span>
      </div>

      <div>
        <span>镜像</span>
        <span>{imageName}</span>
      </div>

      <div>
        <span>规格</span>
        <span>{flavorName}</span>
      </div>
      <div>
        <span>网络</span>
        {networksNode}
      </div>
      <div>
        <span>密钥对</span>
        <span>{createInstance.choosedKeypair}</span>
      </div>
      <div>
        <span>安全组</span>
        {securityGroupsNode}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    createInstance: state.features.instance.create,
    images: selectImages(state),
    flavors: selectFlavors(state),
    networks: selectNetworks(state),
  }
};

export default connect(mapStateToProps, null)(Profile);
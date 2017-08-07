import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectFlavors } from 'app/selectors/nova';
import { selectImages } from 'app/selectors/glance';
import { selectNetworks } from 'app/selectors/neutron';

import styles from './style/Profile.css';

function Profile(props) {
  let create = props.create;

  let imageName = '';
  props.images.data.forEach(ele => {
    if (ele.id === create.choosedImage) {
      imageName = ele.name;
    }
  });

  let flavorName = '';
  props.flavors.data.forEach(ele => {
    if (ele.id === create.choosedFlavor) {
      flavorName = ele.name;
    }
  });

  let networksNode = [];
  create.choosedNetworks.forEach(ele => {
    props.networks.data.forEach(item => {
      if (item.id === ele) {
        networksNode.push(
          <span key={ele}>{item.name}</span>
        );
      }
    })
  });

  let securityGroupsNode = [];
  create.choosedSecurityGroup.forEach(ele => {
    securityGroupsNode.push(
      <span key={ele}>{ele}</span>
    )
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.instance}>
        <span>主机名</span>
        <span>{create.filledInstance}</span>
      </div>

      <div className={styles.image}>
        <span>镜像</span>
        <span>{imageName}</span>
      </div>

      <div className={styles.flavor}>
        <span>规格</span>
        <span>{flavorName}</span>
      </div>

      <div className={styles.network}>
        <span>网络</span>
        {networksNode}
      </div>

      <div className={styles.keypair}>
        <span>密钥对</span>
        <span>{create.choosedKeypair}</span>
      </div>

      <div className={styles.sg}>
        <span>安全组</span>
        {securityGroupsNode}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    create: state.features.instance.create,
    images: selectImages(state),
    flavors: selectFlavors(state),
    networks: selectNetworks(state),
  }
};

export default connect(mapStateToProps, null)(Profile);
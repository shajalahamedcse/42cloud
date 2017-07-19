import React, { Component } from 'react';
import UsageCardPie from './UsageCardPie';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'antd';
import styles from './UsageCard.css';
import classNames from 'classnames';

class UsageCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.card}>
          <UsageCardPie data={this.props.data} color={this.props.colorKey} />
          <div className={styles.profile}>
            <div>
              <span className={classNames(
                styles.inuse,
                {
                  [styles.cores]: 'cores' === this.props.colorKey,
                  [styles.ram]: 'ram' === this.props.colorKey,
                  [styles.instances]: 'instances' === this.props.colorKey
                }
              )}>
                {this.props.data.in_use}
              </span>
              /
              <span className={styles.limit}>
                {this.props.data.limit}
              </span>
              </div>
            <p>{this.props.kind}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UsageCard;
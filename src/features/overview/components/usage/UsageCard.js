import React, { Component } from 'react';
import UsageCardPie from './UsageCardPie';
import styles from './style/UsageCard.css';
import cx from 'classnames';

function UsageCard(props) {
  return (
    <div className={styles.card}>
      <UsageCardPie data={props.data} color={props.colorKey} />
      <div className={styles.profile}>
        <div>
          <span className={cx(
            styles.inuse,
            {
              [styles.cores]: 'cores' === props.colorKey,
              [styles.ram]: 'ram' === props.colorKey,
              [styles.instances]: 'instances' === props.colorKey
            }
          )}>
            {props.data.in_use}
          </span>
          /
          <span className={styles.limit}>
            {props.data.limit}
          </span>
          </div>
        <p>{props.kind}</p>
      </div>
    </div>
  )
}

export default UsageCard;
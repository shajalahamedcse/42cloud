import React from 'react';
import { connect } from 'react-redux';
import { fetchConsoleOutput } from 'app/orm/nova/server/actions';
import { selectConsoleOutput } from 'app/selectors/nova';
import { Spin } from 'antd';

import styles from './ConsoleLog.css';

class ConsoleLog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchConsoleOutput(this.props.instanceID));
  }

  render() {
    if (this.props.consoleOutput.loading) {
      return (
        <Spin />
      )
    } else {
      let log = this.props.consoleOutput.data.split('\n');
      let logNode = [];
      log.forEach((ele, index) => {
        logNode.push(
          <div key={index}>{ele}</div>
        )
      });
      return (
        <div className={styles.log}>
          {logNode}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    consoleOutput: selectConsoleOutput(state),
  }
};

export default connect(mapStateToProps, null)(ConsoleLog);
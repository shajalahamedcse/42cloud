import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { Spin } from 'antd';
import { getOption } from './common';

import { selectMonitor } from 'app/selectors/influxdb';

function CpuCoreChart(props) {

  if (props.monitor.vcpuCore.loading ||
    props.monitor.vcpuTotal.loading ||
    props.monitor.vmem.loading) {
    return(
      <Spin />
    )
  } else {
    return(
      <ReactEcharts
        style={{height: '260px', width: '1000px'}}
        option={getOption(props.monitor.vcpuCore.data, props.timeSpan)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monitor: selectMonitor(state)
  }
};

export default connect(mapStateToProps, null)(CpuCoreChart);

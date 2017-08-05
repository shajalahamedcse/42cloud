import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { selectMonitor } from 'app/selectors/influxdb'
import { getOption } from './common';
import { Spin } from 'antd';

function MemChart(props) {
  if (props.monitor.vmem.loading ||
    props.monitor.vcpuCore.loading ||
    props.monitor.vcpuTotal.loading) {
    return(
      <Spin />
    )
  } else {
    return(
      <ReactEcharts
        style={{height: '260px', width: '1000px'}}
        option={getOption(props.monitor.vmem.data, props.timeSpan)}
      />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    monitor: selectMonitor(state)
  }
};

export default connect(mapStateToProps, null)(MemChart);
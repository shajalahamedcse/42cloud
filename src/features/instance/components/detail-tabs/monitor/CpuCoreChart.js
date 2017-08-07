import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getOption } from './common';

import { selectMonitor } from 'app/selectors/influxdb';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

function CpuCoreChart(props) {

  if (props.monitor.vcpuCore.loading ||
    props.monitor.vcpuTotal.loading ||
    props.monitor.vmem.loading) {
    return(
      <Spin />
    )
  } else {
    return(
      <ReactEchartsCore
        style={{height: '260px', width: '1000px'}}
        echarts={echarts}
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

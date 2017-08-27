import React from 'react'
import MoreOperate from 'features/instance/components/more-operate';
import StartStopInstance from 'features/instance/components/start-stop-instance';
import CreateInstance from 'features/instance/components/create-instance';
import InstanceTable from 'features/instance/components/instance-table';
import commonStyles from 'features/common/styles.css';

function InstanceHome() {
  return (
    <div className={commonStyles.wrapper}>
      <div className={commonStyles.toolbar}>

        <CreateInstance />

        <StartStopInstance />

        <MoreOperate />

      </div>

      <InstanceTable />
    </div>
  )
}
export default InstanceHome;

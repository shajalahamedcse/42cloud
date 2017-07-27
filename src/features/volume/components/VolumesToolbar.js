import React from 'react';
import CreateVolumeButton from './CreateVolumeButton';
import MoreVolumeOperation from './MoreVolumeOperation';

function VolumesToolbar() {
  return (
    <div>
      <CreateVolumeButton />
      <MoreVolumeOperation />
    </div>
  )
}

export default VolumesToolbar;

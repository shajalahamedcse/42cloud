import { combineURL, getToken } from 'app/commons/common';

const getVolumesInfoSuccess = (volumes) => {
  return {
    type: 'GET_VOLUMES_INFO_SUCCESS',
    volumes
  }
};

const getVolumesInfo = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getVolumesInfo');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getVolumesInfoSuccess(resBody.volumes));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

const createVolumeSuccess = (volume) => {
  return {
    type: 'CREATE_VOLUME_SUCCESS',
    volume
  }
};

const createVolume = (reqBody) => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('createVolume');
    reqBody = {
      'volume': reqBody
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(createVolumeSuccess(resBody.volume));
        dispatch(checkVolumeInfo(resBody.volume.id));
      })
    })
  }
};

const checkVolumeInfoSuccess = (volume) => {
  return {
    type: 'CHECK_VOLUME_INFO_SUCCESS',
    volume
  }
};

const checkVolumeInfo = (volumeID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': volumeID};
    let url = combineURL('getVolumeInfo', tmpl);
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then((res) => {
        res.json().then((resBody) => {
          if (resBody.volume.status === 'available') {
            clearInterval(intervalID);
            dispatch(checkVolumeInfoSuccess(resBody.volume))
          }
        })
      })
    }, 1000);
  }
};

const updateVolumeSuccess = (volume, selectedVolume) => {
  return {
    type: 'UPDATE_VOLUME_SUCCESS',
    volume,
    selectedVolume
  }
};
const updateVolume = (reqBody, selectedVolume) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'volume_id': selectedVolume.volumeID};
    let url = combineURL('updateVolume', tmpl);
    reqBody = {
      'volume': reqBody
    };
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(reqBody),
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(updateVolumeSuccess(resBody.volume, selectedVolume));
        // dispatch(checkVolumeInfo(selectedVolume.volumeID));
      })
    })
  }
}

const selectVolumesSuccess = (selectedVolumes) => {
  return {
    type: 'SELECTED_VOLUMES_SUCCESS',
    selectedVolumes
  }
};

export { getVolumesInfo, createVolume, selectVolumesSuccess, updateVolume };

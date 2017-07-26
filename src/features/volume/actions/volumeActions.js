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
        console.log(resBody);
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
            console.log('available');
            clearInterval(intervalID);
            dispatch(checkVolumeInfoSuccess(resBody.volume))
          }
        })
      })
    }, 1000);
  }
};
export { getVolumesInfo, createVolume };

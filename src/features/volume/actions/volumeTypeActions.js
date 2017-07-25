import { combineURL } from 'app/commons/common';

const getVolumeTypesSuccess = (volumeTypes) => {
  return {
    type: 'GET_VOLUME_TYPES_SUCCESS',
    volumeTypes
  }
};

const getVolumeTypes = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let volumeTypesURL = combineURL('getVolumeTypes');

    fetch(volumeTypesURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        console.log(resBody);
        dispatch(getVolumeTypesSuccess(resBody.volume_types));
      })
    })
  }
};

export { getVolumeTypes };
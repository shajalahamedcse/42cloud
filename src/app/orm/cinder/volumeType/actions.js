import { combineURL } from 'app/commons/common';

const getVolumeTypesSuccess = (volumeTypes) => {
  return {
    type: 'GET_VOLUME_TYPES_SUCCESS',
    volumeTypes
  }
};

const getVolumeTypesRequest = () => {
  return {
    type: 'GET_VOLUME_TYPES_REQUEST',
  }
};

export const getVolumeTypes = () => {
  return (dispatch) => {
    dispatch(getVolumeTypesRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getVolumeTypes');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getVolumeTypesSuccess(resBody.volume_types));
      }).catch(err => {
        console.log(err);
      })
    }).catch(error => {
      console.log(error);
    })
  }
};

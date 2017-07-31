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

const getVolumeTypesFailure = (error) => {
  return {
    type: 'GET_VOLUME_TYPES_FAILURE',
    error
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
      })
    }).catch(error => {
      dispatch(getVolumeTypesFailure(error));
    })
  }
};

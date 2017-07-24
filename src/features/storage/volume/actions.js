import { combineURL } from 'app/commons/common';

const getVolumesInfoSuccess = (payload) => {
  return {
    type: 'GET_VOLUMES_INFO_SUCCESS',
    payload: payload
  }
};

const getVolumesInfo = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let volumesInfoURL = combineURL('getVolumesInfo');
    fetch(volumesInfoURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getVolumesInfoSuccess(resBody));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getVolumesInfo };
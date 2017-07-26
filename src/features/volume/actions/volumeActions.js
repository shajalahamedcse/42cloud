import { combineURL } from 'app/commons/common';

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

export { getVolumesInfo };

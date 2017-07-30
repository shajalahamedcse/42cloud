import { combineURL, getToken } from 'app/commons/common';

//
const getFlavorsInfoSuccess = (flavors) => {
  return {
    type: 'GET_FLAVORS_INFO_SUCCESS',
    flavors
  }
};

const getFlavorsInfo = () => {
  return (dispatch) => {
    let scopedToken = getToken();
    let url = combineURL('getFlavorsInfo');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getFlavorsInfoSuccess(resBody.flavors));
      }).catch(err => {
        throw err;
      }).catch(err => {
        throw err;
      })
    })
  }
};

export { getFlavorsInfo };
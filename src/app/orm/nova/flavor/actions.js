import { combineURL, getToken } from 'app/commons/common';

//
const getFlavorsInfoSuccess = (flavors) => ({
    type: 'GET_FLAVORS_INFO_SUCCESS',
    flavors
});

const getFlavorsInfoRequest = () => ({
  type: 'GET_FLAVORS_INFO_REQUEST'
});

const getFlavorsInfo = () => {
  return (dispatch) => {
    getFlavorsInfoRequest();
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
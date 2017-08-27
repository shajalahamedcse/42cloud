import { combineURL, getToken, ormItems } from 'app/commons/common';

//
const getFlavorsInfoSuccess = (flavors) => {
  let [items, itemsById] = flavors;
  return {
    type: 'GET_FLAVORS_INFO_SUCCESS',
    items,
    itemsById,
  }
};

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
        dispatch(getFlavorsInfoSuccess(ormItems(resBody.flavors)));
      }).catch(err => {
        throw err;
      }).catch(err => {
        throw err;
      })
    })
  }
};

export { getFlavorsInfo };
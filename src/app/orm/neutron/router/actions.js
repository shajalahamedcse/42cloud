import { getToken, combineURL } from 'app/commons/common';

const getRoutersSuccess = (routers) => {
  return {
    type: 'GET_ROUTERS_SUCCESS',
    routers
  }
};

const getRoutersRequest = () => {
  return {
    type: 'GET_ROUTERS_REQUEST'
  }
};

const getRouters = () => {
  return (dispatch) => {
    dispatch(getRoutersRequest());
    let scopedToken = getToken();
    let url = combineURL('getRouters');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRoutersSuccess(resBody.routers));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

export { getRouters };
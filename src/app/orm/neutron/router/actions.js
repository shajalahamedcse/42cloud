import { getToken, combineURL, ormItems } from 'app/commons/common';

const getRoutersSuccess = (routers) => {
  let [items, itemsById] = routers;
  return {
    type: 'GET_ROUTERS_SUCCESS',
    items,
    itemsById
  }
};

const getRoutersRequest = () => ({
  type: 'GET_ROUTERS_REQUEST'
});

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
        dispatch(getRoutersSuccess(ormItems(resBody.routers)));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const getRouterInfoSuccess = (router) => ({
  type: 'GET_ROUTER_INFO_SUCCESS',
  router
});

const getRouterInfoRequest = () => ({
  type: 'GET_ROUTER_INFO_REQUEST'
});

const getRouterInfo = (routerId) => {
  return (dispatch) => {
    dispatch(getRouterInfoRequest());
    let scopedToken = getToken();
    let tmpl = {'router_id': routerId};
    let url = combineURL('getRouterInfo', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getRouterInfoSuccess(resBody.router))
      })
    })
  }
};

export { getRouters, getRouterInfo };
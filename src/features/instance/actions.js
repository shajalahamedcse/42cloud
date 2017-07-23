import { combineURL } from 'app/commons/common';

const getServersInfoSuccess = (payload) => {
  return {
    type: 'GET_SERVERS_INFO_SUCCESS',
    payload: payload
  }
};

const getServersInfo = () => {
  return (dispatch) => {
   let scopedToken = localStorage.getItem('scopedToken');
   let serversInfoURL = combineURL('getServersInfo');
   fetch(serversInfoURL, {
     method: 'GET',
     headers: {
       'X-Auth-Token': scopedToken
     }
   }).then((res) => {
     res.json().then((resBody) => {
       console.log(resBody);
       dispatch(getServersInfoSuccess(resBody));
     })
   })
  }
};

export { getServersInfo };
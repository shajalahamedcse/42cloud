import { combineURL } from 'app/commons/common';

const getServersInfoSuccess = (servers) => {
  return {
    type: 'GET_SERVERS_INFO_SUCCESS',
    servers
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
       dispatch(getServersInfoSuccess(resBody.servers));
     }).catch((err) => {
       console.log(err);
     })
   }).catch((err) => {
     console.log(err);
   })
  }
};

export { getServersInfo };
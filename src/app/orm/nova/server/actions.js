import { combineURL, getToken } from 'app/commons/common';

const getServersInfoSuccess = (servers) => {
  return {
    type: 'GET_SERVERS_INFO_SUCCESS',
    servers
  }
};

const getServersInfo = () => {
  return (dispatch) => {
   let scopedToken = getToken();
   let url = combineURL('getServersInfo');
   fetch(url, {
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

//
const getServerInfoSuccess = (server) => {
  return {
    type: 'GET_SERVER_INFO_SUCCESS',
    server
  }
};

const getServerInfo = (serverID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('getServerInfo', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getServerInfoSuccess(resBody.server));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err
    })
  }
};


export {
  getServersInfo,
  getServerInfo,
};
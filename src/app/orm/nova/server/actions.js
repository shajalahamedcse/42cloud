import { combineURL, getToken } from 'app/commons/common';

const getServersInfoSuccess = (servers) => {
  return {
    type: 'GET_SERVERS_INFO_SUCCESS',
    servers
  }
};

const getServersInfoRequest = () => {
  return {
    type: 'GET_SERVERS_INFO_REQUEST',
  }
};

const getServersInfo = () => {
  return (dispatch) => {
    getServersInfoRequest();
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

const getServerInfoRequest = () => {
  return {
    type: 'GET_SERVER_INFO_REQUEST'
  }
};

const getServerInfo = (serverID) => {
  return (dispatch) => {
    dispatch(getServerInfoRequest());

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

//
const pollServerInfoSuccess = (server) => {
  return {
    type: 'POLL_SERVER_INFO_SUCCESS',
    server,
  }
};

const pollServerInfo = (serverID) => {
  return (dispatch) => {
    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('getServerInfo', tmpl);
    let intervalID = setInterval(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Auth-Token': scopedToken
        }
      }).then(res => {
        res.json().then(resBody => {
          dispatch(pollServerInfoSuccess(resBody.server));
          if (resBody.server.status === 'ACTIVE') {
            clearInterval(intervalID);
          }
        })
      })
    }, 3000);
  }
};

//
const createServerSuccess = (server) => {
  return {
    type: 'CREATE_SERVER_SUCCESS',
    server
  }
};

const createServerRequest = () => {
  return {
    type: 'CREATE_SERVER_REQUEST'
  }
};

const createServer = (serverBody) => {
  let securityGroups = [];
  serverBody.choosedSecurityGroup.forEach(item => {
    securityGroups.push({
      "name": item,
    })
  });

  let networks = [];
  serverBody.choosedNetworks.forEach(item => {
    networks.push({
      "uuid": item,
    })
  });

  let server = {
    "name": serverBody.filledInstance,
    "imageRef": serverBody.choosedImage,
    "flavorRef": serverBody.choosedFlavor,
    "networks": networks
  }

  if (serverBody.choosedKeypair) {
    server["key_name"] = serverBody.choosedKeypair;
  }

  if (securityGroups) {
    server["security_groups"] = securityGroups;
  }

  let reqBody = {
    server,
  };

  return (dispatch) => {
    dispatch(createServerRequest());
    let scopedToken = getToken();
    let url = combineURL('createServer');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json().then(resBody => {
        let createServer = {
          'id': resBody.server.id,
          'name': server.name,
          'image': {'id': server.imageRef},
          'flavor': {'id': server.flavorRef},
        };


        console.log(createServer);
        dispatch(createServerSuccess(createServer));
        dispatch(pollServerInfo(createServer.id));
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
};

const fetchConsoleOutputSuccess = (output) => {
  return {
    type: 'FETCH_CONSOLE_OUTPUT_SUCCESS',
    output,
  }
};

const fetchConsoleOutputRequest = () => {
  return {
    type: 'FETCH_CONSOLE_OUTPUT_REQUEST',
  }
};

const fetchConsoleOutput = (serverID) => {
  return (dispatch) => {
    dispatch(fetchConsoleOutputRequest());

    let reqBody = {
      "os-getConsoleOutput": {
        "length": 50
      }
    };

    let scopedToken = getToken();
    let tmpl = {'server_id': serverID};
    let url = combineURL('operateServer', tmpl);
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    }).then(res => {
      res.json().then(resBody => {
        dispatch(fetchConsoleOutputSuccess(resBody.output));
      })
    })
  }
};

export {
  getServersInfo,
  getServerInfo,
  createServer,
  fetchConsoleOutput,
};
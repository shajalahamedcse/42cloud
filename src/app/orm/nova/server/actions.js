import { combineURL, getToken } from 'app/commons/common';

const getServersSuccess = (servers) => {
  return {
    type: 'GET_SERVERS_SUCCESS',
    servers
  }
};

const getServersRequest = () => {
  return {
    type: 'GET_SERVERS_REQUEST'
  }
};

const getServers = () => {
  return (dispatch) => {
    dispatch(getServersRequest());
    let scopedToken = getToken();
    let url = combineURL('getServers');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getServersSuccess(resBody.servers));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

const getServersInfoSuccess = (serversInfo) => {
  return {
    type: 'GET_SERVERS_INFO_SUCCESS',
    serversInfo
  }
};

const getServersInfoRequest = () => {
  return {
    type: 'GET_SERVERS_INFO_REQUEST',
  }
};

const getServersInfo = () => {
  return (dispatch) => {
    dispatch(getServersInfoRequest());
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
        }).catch(err => {
          clearInterval(intervalID);
          throw err;
        })
      }).catch(err => {
        clearInterval(intervalID);
        throw err;
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
  };

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
        dispatch(createServerSuccess(createServer));
        dispatch(pollServerInfo(createServer.id));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
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

// 云主机操作
const operateServerSuccess = () => {
  return {
    type: 'OPERATE_STOP_SERVER_SUCCESS',
  }
};

const operateServer = (type, serversID) => {
  return (dispatch) => {
    Promise.all(serversID.map(serverID => {
      let reqBody = {};
      if (type === 'start') {
        reqBody = {
          'os-start': null
        }
      } else if (type === 'stop') {
        reqBody = {
          'os-stop': null
        }
      }

      let scopedToken = getToken();
      let tmpl = {'server_id': serverID};
      let url = combineURL('operateServer', tmpl);
      return fetch(url, {
        method: 'POST',
        headers: {
          'X-Auth-Token': scopedToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      }).then(res => {
        if (res.status === 202) {
          dispatch(operateServerSuccess());
          dispatch(pollOperateServer(type, serverID));
        }
      })
    }))
  }
};

// 轮询云主机详细信息
const pollOperateServersSuccess = (server) => {
  return {
    type: 'POLL_OPERATE_SERVER_SUCCESS',
    server
  }
};

const pollOperateServer = (type, serverID) => {
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
        console.log(res);
        res.json().then(resBody => {
          console.log(resBody);
          dispatch(pollOperateServersSuccess(resBody.server));
          if (type === 'start' && resBody.server.status === 'ACTIVE') {
            clearInterval(intervalID);
          } else if (type === 'stop' && resBody.server.status === 'SHUTOFF') {
            clearInterval(intervalID);
          }
        }).catch(err => {
          clearInterval(intervalID);
          throw err;
        })
      }).catch(err => {
        clearInterval(intervalID);
        throw err;
      })
    }, 2000)
  }
};

export {
  getServers,
  getServersInfo,
  getServerInfo,
  createServer,
  fetchConsoleOutput,
  operateServer,
};
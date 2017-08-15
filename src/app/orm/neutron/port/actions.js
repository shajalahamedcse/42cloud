import { getToken, combineURL } from 'app/commons/common';

const getPortsSuccess = (ports) => ({
  type: 'GET_PORTS_SUCCESS',
  ports
});

const getPortsRequest = () => ({
  type: 'GET_PORTS_REQUEST',
});

const getPorts = () => {
  return (dispatch) => {
    dispatch(getPortsRequest());
    let scopedToken = getToken();
    let url = combineURL('getPorts');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getPortsSuccess(resBody.ports));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

export { getPorts };
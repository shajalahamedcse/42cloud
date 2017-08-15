import { getToken, combineURL } from 'app/commons/common';

const getSubnetsSuccess = (subnets) => ({
  type: 'GET_SUBNETS_SUCCESS',
  subnets
});

const getSubnetsRequest = () => ({
  type: 'GET_SUBNETS_REQUEST'
});

const getSubnets = () => {
  return (dispatch) => {
    dispatch(getSubnetsRequest());
    let scopedToken = getToken();
    let url = combineURL('getSubnets');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getSubnetsSuccess(resBody.subnets));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  }
};

export { getSubnets };

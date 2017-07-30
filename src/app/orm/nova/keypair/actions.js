import { combineURL } from 'app/commons/common';

const getKeyPairsSuccess = (keypairs) => {
  return {
    type: 'GET_KEY_PAIRS_SUCCESS',
    keypairs
  }
};

const getKeyPairs = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getKeyPairs');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getKeyPairsSuccess(resBody.keypairs));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getKeyPairs };
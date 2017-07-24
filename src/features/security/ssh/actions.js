import { combineURL } from 'app/commons/common';

const getKeyPairsSuccess = (payload) => {
  return {
    type: 'GET_KEY_PAIRS_SUCCESS',
    payload: payload
  }
};

const getKeyPairs = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let keyPairsURL = combineURL('getKeyPairs');

    fetch(keyPairsURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        console.log(resBody);
        dispatch(getKeyPairsSuccess(resBody));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getKeyPairs };
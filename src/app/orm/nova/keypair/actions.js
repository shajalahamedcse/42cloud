import { combineURL } from 'app/commons/common';

const getKeypairsSuccess = (keypairs) => ({
  type: 'GET_KEYPAIRS_SUCCESS',
  keypairs
});

const getKeypairsRequest = () => ({
  type: 'GET_KEYPAIRS_REQUEST',
});

const getKeypairs = () => {
  return (dispatch) => {
    dispatch(getKeypairsRequest());
    let scopedToken = localStorage.getItem('scopedToken');
    let url = combineURL('getKeypairs');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getKeypairsSuccess(resBody.keypairs));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getKeypairs };
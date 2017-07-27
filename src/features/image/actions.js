import { combineURL } from 'app/commons/common';

const getImagesSuccess = (payload) => {
  return {
    type: 'GET_IMAGES_SUCCESS',
    payload: payload
  }
};

const getImages = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let getImagesURL = combineURL('getImages');
    fetch(getImagesURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getImagesSuccess(resBody));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getImages };
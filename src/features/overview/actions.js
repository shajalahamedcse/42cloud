import { combineURL } from 'app/commons/common';
import _ from 'lodash';

const getProjectQuotaSuccess = (payload) => {
  return {
    type: 'GET_PROJECT_QUOTA_SUCCESS',
    payload: payload
  }
};

const getProjectQuota = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = sessionStorage.getItem('projectID');
    let data = {'project_id': projectID};
    let projectQuotaURL = combineURL('getProjectQuota');
    projectQuotaURL = _.template(projectQuotaURL)(data);

    fetch(projectQuotaURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getProjectQuotaSuccess(resBody));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getProjectQuota };


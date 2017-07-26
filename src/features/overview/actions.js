import { combineURL } from 'app/commons/common';

const getProjectQuotaSuccess = (quotaSet) => {
  return {
    type: 'GET_PROJECT_QUOTA_SUCCESS',
    quotaSet
  }
};

const getProjectQuota = () => {
  return (dispatch) => {
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = sessionStorage.getItem('projectID');
    let tmpl = {'project_id': projectID};
    let url = combineURL('getProjectQuota', tmpl);
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        dispatch(getProjectQuotaSuccess(resBody.quota_set));
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }
};

export { getProjectQuota };


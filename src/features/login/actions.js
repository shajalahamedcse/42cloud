import _ from 'lodash';
import { path } from '../../config/api';
import  * as constants from '../constants';

export const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST'
  }
}

export const loginSuccess = (payload) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: payload
  }
}

export const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
}

export const login = (values) => {
  return (dispatch) => {
    identityStep1(dispatch, values);
  }
}

const identityStep1 = (dispatch, values) => {
    const auth = {
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "name": values.userName,
              "domain": {
                "name": "Default"
              },
              "password": values.password
            }
          }
        }
      }
    }

    const tokenURL = constants.OS_IDENTITY + path.fetchToken;
    fetch(tokenURL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      identityStep2(dispatch, res);
    }).catch((error) => {
      //
    })
}

const identityStep2 = (dispatch, res) => {
  res.json().then((resBody) => {
    const userId = resBody.token.user.id;
    const data = {'userid': userId};
    const newPath = _.template(path.getOwnProjects)(data);
    const unscopedToken = res.headers.get('X-Subject-Token');
    const projectURL = constants.OS_IDENTITY + newPath;

    fetch(projectURL, {
      headers: {
        "X-Auth-Token": unscopedToken
      }
    }).then((res) => {
      identityStep3(dispatch, res, unscopedToken);
    }).catch((error) => {
      //
    })
  })
}

const identityStep3 = (dispatch, res, unscopedToken) => {
  res.json().then((resBody) => {
    const auth = {
      "auth": {
        "identity": {
          "methods": [
            "token"
          ],
          "token": {
            "id": unscopedToken
          }
        },
        "scope": {
          "project": {
            "id": resBody.projects[0].id
          }
        }
      }
    }

    const tokenURL = constants.OS_IDENTITY + path.fetchToken;
    fetch(tokenURL, {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      res.json().then((resBody) => {
        console.log(resBody);
        localStorage.setItem('scopedToken', res.headers.get('X-Subject-Token'));
        localStorage.setItem('identityData', JSON.stringify(resBody));
        dispatch(loginSuccess(resBody));
      })
    }).catch((erro) => {
      //
    })
  })
}

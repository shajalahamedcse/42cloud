import _ from 'lodash';
import { parseURLPrefix, combineIdentityURL } from 'app/commons/common';

const loginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS',
  }
}

const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
}

const loginRequest = () => {
  return {
    type: 'LOGIN_REQUEST'
  }
}

const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

const logoutFailure = () => {
  return {
    type: 'LOGOUT_FAILURE'
  }
}

const logoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST'
  }
}

const loadTokenDataSuccess = () => {
  return {
    type: 'LOAD_TOKEN_DATA_SUCCESS'
  }
}


// 
const login = (values) => {
  return (dispatch) => {
    fetchUnscopedToken(dispatch, values);
  }
}

const fetchUnscopedToken = (dispatch, values) => {
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

    const tokenURL = combineIdentityURL('fetchToken');
    fetch(tokenURL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      getOwnProjects(dispatch, res);
    }).catch((error) => {
      //
    })
}

const getOwnProjects = (dispatch, res) => {
  res.json().then((resBody) => {
    const userId = resBody.token.user.id;
    const data = {'user_id': userId};
    const unscopedToken = res.headers.get('X-Subject-Token');
    let projectURL = combineIdentityURL('getOwnProjects');
    projectURL = _.template(projectURL)(data);

    fetch(projectURL, {
      headers: {
        "X-Auth-Token": unscopedToken
      }
    }).then((res) => {
      fetchScopedToken(dispatch, res, unscopedToken);
    }).catch((error) => {
      //
    })
  })
}

const fetchScopedToken = (dispatch, res, unscopedToken) => {
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

    const tokenURL = combineIdentityURL('fetchToken');
    fetch(tokenURL, {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      res.json().then((resBody) => {
        let urlPrefix = parseURLPrefix(resBody);
        sessionStorage.setItem('urlPrefix', JSON.stringify(urlPrefix));
        sessionStorage.setItem('projectID', resBody.token.project.id);
        localStorage.setItem('scopedToken', res.headers.get('X-Subject-Token'));
        dispatch(loginSuccess());
      })
    }).catch((erro) => {
      //
    })
  })
}

const loadTokenData = (token) => {
  return (dispatch) => {
    const tokenURL = combineIdentityURL('getTokenData');
    fetch(tokenURL, {
      method: 'GET',
      headers: {
        'X-Auth-Token': token,
        'X-Subject-Token': token
      }
    }).then((res) => {
      res.json().then((resBody) => {
        let urlPrefix = parseURLPrefix(resBody);
        sessionStorage.setItem('urlPrefix', JSON.stringify(urlPrefix));
        sessionStorage.setItem('projectID', resBody.token.project.id);
        dispatch(loadTokenDataSuccess());
      })
    })
  }
};


//
const logout = (token) => {
  return (dispatch) => {
    const tokenURL = combineIdentityURL('deleteToken');
    fetch(tokenURL, {
      method: 'DELETE',
      headers: {
        'X-Auth-Token': token,
        'X-Subject-Token': token
      }
    }).then((res) => {
      //localStorage.removeItem('scopedToken');
      dispatch(logoutSuccess());
    }).catch((error) => {

    })
  }
};

export { login, loadTokenData, logout };

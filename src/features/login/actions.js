import _ from 'lodash';
import { identityURL, path } from '../../config/api';

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
    identityStep1(values);
  }
}

const identityStep1 = (values) => {
    const tokenURL = identityURL + path.fetchToken;
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

    fetch(tokenURL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      identityStep2(response);
    }).catch((error) => {
      //
    })
}

const identityStep2 = (response) => {
  response.json().then((responseBody) => {
    const userId = responseBody.token.user.id;
    const data = {'userid': userId};
    const newPath = _.template(path.getOwnProjects)(data);
    const unscopedToken = response.headers.get('X-Subject-Token');
    const projectURL = identityURL + newPath;

    fetch(projectURL, {
      headers: {
        "X-Auth-Token": unscopedToken
      }
    }).then((response) => {
      identityStep3(response, unscopedToken);
    }).catch((error) => {
      //
    })
  })
}

const identityStep3 = (response, unscopedToken) => {
  response.json().then((responseBody) => {
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
            "id": responseBody.projects[0].id
          }
        }
      }
    }

    const tokenURL = identityURL + path.fetchToken;
    fetch(tokenURL, {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      response.json().then((responseBody) => {
        console.log(responseBody);
        // dispatch(loginSuccess(responseBody));
      })
    }).catch((erro) => {
      //
    })
  })
}
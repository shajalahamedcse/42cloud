const initialState = {
  token: {}
}

export const identityReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const isLoggedReducer = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS': {
      return true
    }

    default: {
      return state
    }
  }
}

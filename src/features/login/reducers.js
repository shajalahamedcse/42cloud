const initialState = {
  identity: {},
  isLogged: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        identity: action.payload,
        isLogged: true
      }
    }

    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        ...initialState
      }
    }
    
    default: {
      return state
    }
  }
}

export default authReducer;
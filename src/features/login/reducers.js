const initialState = {
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLogged: true,
      }
    }

    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        ...initialState
      }
    }

    case 'LOAD_TOKEN_DATA_SUCCESS': {
      return {
        ...state,
        isLogged: true,
      }
    }
    
    default: {
      return state
    }
  }
}

export default authReducer;
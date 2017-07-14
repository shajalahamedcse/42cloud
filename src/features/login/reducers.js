const initialState = {
  user: {},
  project: {},
  catalog: {}
}

const identityReducer = (state = initialState, action) => {
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

export default identityReducer;
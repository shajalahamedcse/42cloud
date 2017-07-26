let initialState = {
  loading: false,
  payload: {}
};

const instanceReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_SERVERS_INFO_SUCCESS': {
      return {
        ...state,
        payload: action.payload,
        loading: true
      }
    }

    default: {
      return state
    }
  }
};

export default instanceReducer;
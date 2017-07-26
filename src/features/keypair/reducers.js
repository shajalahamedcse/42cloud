const initialState = {
  loading: false,
  payload: {}
};

const keypairReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_KEY_PAIRS_SUCCESS': {
      return {
        ...state,
        loading: true,
        payload: action.payload
      }
    }

    default: {
      return state
    }
  }
};

export default keypairReducer;
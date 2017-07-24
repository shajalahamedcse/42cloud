const initialState = {
  loading: false,
  payload: {}
};

const volumeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_VOLUMES_INFO_SUCCESS': {
      return {
        ...state,
        loading: true,
        payload: action.payload
      }
    }

    default: {
      return state;
    }
  }
};

export default volumeReducer;
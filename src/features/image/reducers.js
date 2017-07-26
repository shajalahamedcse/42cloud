const initialState = {
  loading: false,
  payload: {}
};

const imageReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_IMAGES_SUCCESS': {
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

export default imageReducer;
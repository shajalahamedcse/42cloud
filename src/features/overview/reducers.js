const initialState = {
  loading: false,
  payload: {}
};

const overviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECT_QUOTA_SUCCESS': {
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

export default overviewReducer;

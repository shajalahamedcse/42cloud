const initialState = {
  loading: false,
  quota_set: {}
};

const overviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECT_QUOTA_SUCCESS': {
      return {
        ...state,
        loading: true,
        quota_set: action.quotaSet
      }
    }

    default: {
      return state;
    }
  }
};

export default overviewReducer;

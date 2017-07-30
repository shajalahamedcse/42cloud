const quotaSet = (state = {loading: false, data: {}}, action) => {
  switch (action.type) {
    case 'GET_PROJECT_QUOTA_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.quotaSet,
      }
    }

    default: {
      return state;
    }
  }
};

export {
  quotaSet,
};

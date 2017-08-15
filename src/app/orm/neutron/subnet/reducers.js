const subnets = (state = {loading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_SUBNETS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_SUBNETS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.subnets
      }
    }

    default: {
      return state;
    }
  }
};

export { subnets };

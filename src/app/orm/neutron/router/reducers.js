const routers = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_ROUTERS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_ROUTERS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.routers
      }
    }

    default: {
      return state;
    }
  }
};

export { routers };
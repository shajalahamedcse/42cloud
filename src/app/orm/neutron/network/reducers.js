const networks = (state = { loading: false, data: [] }, action) => {
  switch(action.type) {
    case 'GET_NETWORKS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.networks
      }
    }

    case 'GET_NETWORKS_REQUEST': {
      return {
        loading: true,
      }
    }

    default: {
      return state;
    }
  }
};

export { networks };
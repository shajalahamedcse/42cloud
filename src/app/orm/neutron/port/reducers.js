const ports = (state = {loading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_PORTS_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_PORTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.ports
      }
    }

    default: {
      return state
    }
  }
};

export { ports };
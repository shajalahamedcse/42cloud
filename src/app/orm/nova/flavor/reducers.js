const flavors = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_FLAVORS_INFO_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.flavors
      }
    }

    case 'GET_FLAVORS_INFO_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    default: {
      return state
    }
  }
};

export { flavors };
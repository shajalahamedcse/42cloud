const flavors = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_FLAVORS_INFO_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.flavors
      }
    }

    default: {
      return state
    }
  }
};

export { flavors };
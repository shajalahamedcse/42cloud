const keypairs = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_KEY_PAIRS_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.keypairs,
      }
    }

    default: {
      return state
    }
  }
};

export {
  keypairs,
};
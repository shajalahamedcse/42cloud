const keypairs = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_KEYPAIRS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.keypairs,
      }
    }

    case 'GET_KEYPAIRS_REQUEST': {
      return {
        loading: true,
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
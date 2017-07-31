const volumeTypes = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_VOLUME_TYPES_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.volumeTypes
      }
    }

    case 'GET_VOLUME_TYPES_REQUEST': {
      return {
        loading: true
      }
    }

    case 'GET_VOLUME_TYPES_FAILURE': {
      return {

      }
    }

    default: {
      return state;
    }
  }
};

export { volumeTypes };
const volumeTypes = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_VOLUME_TYPES_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.volumeTypes
      }
    }

    default: {
      return state;
    }
  }
};

export { volumeTypes };
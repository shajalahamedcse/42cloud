const images = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_IMAGES_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.images,
      }
    }

    case 'GET_IMAGES_REQUEST': {
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

export {
  images
};
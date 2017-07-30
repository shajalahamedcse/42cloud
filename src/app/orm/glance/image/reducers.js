const images = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_IMAGES_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.images,
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
const volumes = (state = {loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_VOLUMES_INFO_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.volumes
      }
    }

    case 'GET_VOLUMES_INFO_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'CREATE_VOLUME_SUCCESS': {
      return {
        ...state,
        data: [action.volume, ...state.data]
      }
    }

    case 'POLL_VOLUME_INFO_SUCCESS':
    case 'UPDATE_VOLUME_SUCCESS':
    case 'GET_VOLUME_INFO_SUCCESS':
    case 'POLL_VOLUME_IF_DELETED_FAILURE': {
      let data = [...state.data];
      let index = data.findIndex(ele => (ele.id === action.volume.id));
      data[index] = action.volume;
      return {...state, data}
    }

    case 'POLL_VOLUME_IF_DELETED_SUCCESS': {
      let data = [...state.data];
      let index = data.findIndex(ele => (ele.id === action.volume.id));
      data.splice(index, 1);
      return {...state, data};
    }

    case 'DELETE_VOLUME_SUCCESS':
    case 'RESIZE_VOLUME_SUCCESS': {
      return state;
    }

    default: {
      return state;
    }
  }
};

export { volumes  }

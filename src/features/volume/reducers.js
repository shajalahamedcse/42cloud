import { combineReducers } from 'redux';

const volumesInitialState = {
  loading: false,
  volumes: []
};
const volumesReducer = (state = volumesInitialState, action) => {
  switch(action.type) {
    case 'GET_VOLUMES_INFO_SUCCESS': {
      return {
        ...state,
        loading: true,
        volumes: action.volumes
      }
    }

    case 'CREATE_VOLUME_SUCCESS': {
      return {
        ...state,
        volumes: [action.volume, ...state.volumes]
      }
    }

    case 'POLL_VOLUME_INFO_SUCCESS':
    case 'UPDATE_VOLUME_SUCCESS':
    case 'GET_VOLUME_INFO_SUCCESS':
    case 'POLL_VOLUME_IF_DELETED_FAILURE': {
      let volumes = [...state.volumes];
      let index = volumes.findIndex(ele => (ele.id === action.volume.id));
      volumes[index] = action.volume;
      return {...state, volumes}
    }

    case 'POLL_VOLUME_IF_DELETED_SUCCESS': {
      let volumes = [...state.volumes];
      let index = volumes.findIndex(ele => (ele.id === action.volume.id));
      volumes.splice(index, 1);
      return {...state, volumes};
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

const volumeTypesInitialState = {
  loading: false,
  volume_types: []
};
const volumeTypesReducer = (state = volumeTypesInitialState, action) => {
  switch(action.type) {
    case 'GET_VOLUME_TYPES_SUCCESS': {
      return {
        ...state,
        loading: true,
        volume_types: action.volumeTypes
      }
    }

    default: {
      return state;
    }
  }
};

const selectedVolumesReducer = (state = [], action) => {
  switch(action.type) {
    case 'SELECT_VOLUMES': {
      return [...action.selectedVolumes]
    }

    default: {
      return state;
    }
  }
};

const volumeReducer = combineReducers({
  volumes: volumesReducer,
  volumeTypes: volumeTypesReducer,
  selectedVolumes: selectedVolumesReducer
});

export default volumeReducer;
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

    case 'CHECK_VOLUME_INFO_SUCCESS': {
      return {
        ...state,
        volumes: [action.volume, ...state.volumes.slice(1)]
      }
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

const volumeReducer = combineReducers({
  volumes: volumesReducer,
  volumeTypes: volumeTypesReducer
});

export default volumeReducer;
import { combineReducers } from 'redux';

const selectedVolumes = (state = [], action) => {
  switch(action.type) {
    case 'SELECT_VOLUMES': {
      return [...action.selectedVolumes]
    }

    default: {
      return state;
    }
  }
};

const volume = combineReducers({
  selectedVolumes
});

export default volume;

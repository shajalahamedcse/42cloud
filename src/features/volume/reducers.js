import { combineReducers } from 'redux';

const choosedVolumes = (state = [], action) => {
  switch(action.type) {
    case 'SELECT_VOLUMES': {
      return [...action.choosedVolumes]
    }

    default: {
      return state;
    }
  }
};

const volume = combineReducers({
  choosedVolumes
});

export default volume;

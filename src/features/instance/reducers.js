import { combineReducers } from 'redux';

const create = (state = {choosedNetworks: []}, action) => {
  switch(action.type) {
    case 'ADD_NETWORK': {
      return {
        ...state,
        choosedNetworks: [...state.choosedNetworks, action.id]
      }
    }

    case 'REMOVE_NETWORK': {
      let index = state.choosedNetworks.findIndex(ele => ele === action.id)
      let choosedNetworks = [...state.choosedNetworks];
      choosedNetworks.splice(index, 1);

      return {
        ...state,
        choosedNetworks,
      }
    }

    default: {
      return state;
    }
  }
};

const instance = combineReducers({
  create
});

export default instance

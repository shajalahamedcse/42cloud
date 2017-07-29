import { combineReducers } from 'redux';

let initialState = {
  loading: false,
  servers: []
};

const serversReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_SERVERS_INFO_SUCCESS': {
      return {
        ...state,
        servers: action.servers,
        loading: true
      }
    }

    default: {
      return state
    }
  }
};

const instanceReducer = combineReducers({
  servers: serversReducer
});

export default instanceReducer;
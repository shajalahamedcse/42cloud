const servers = (state = {loading: false, data:[]}, action) => {
  switch(action.type) {
    case 'GET_SERVERS_INFO_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.servers,
      }
    }

    case 'GET_SERVERS_INFO_REQUEST': {
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

const server = (state = {loading: false, data: {}}, action) => {
  switch(action.type) {
    case 'GET_SERVER_INFO_SUCCESS': {
      return {
        ...state,
        loading: true,
        data: action.server,
      }
    }

    default: {
      return state
    }
  }
};

export {
  servers,
  server,
};
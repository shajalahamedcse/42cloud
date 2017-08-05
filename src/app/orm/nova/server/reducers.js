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

    case 'CREATE_SERVER_SUCCESS': {
      return {
        ...state,
        data: [action.server, ...state.data],
      }
    }

    case 'POLL_SERVER_INFO_SUCCESS': {
      let data = [...state.data];
      let index = data.findIndex(ele => (ele.id === action.server.id));
      data[index] = action.server;
      return {
        ...state,
        data
      }
    }

    default: {
      return state
    }
  }
};

const server = (state = {loading: false, data: {}}, action) => {
  switch(action.type) {
    case 'GET_SERVER_INFO_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_SERVER_INFO_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.server,
      }
    }

    default: {
      return state
    }
  }
};

const consoleOutput = (state = {loading: false, data: ''}, action) => {
  switch(action.type) {
    case 'FETCH_CONSOLE_OUTPUT_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.output
      }
    }

    case 'FETCH_CONSOLE_OUTPUT_REQUEST': {
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
  servers,
  server,
  consoleOutput,
};
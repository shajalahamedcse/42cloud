const ports = (state = {loading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_PORTS_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_PORTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.ports
      }
    }

    default: {
      return state
    }
  }
};

const routerPorts = (state = {loading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_ROUTER_PORTS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_ROUTER_PORTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.ports
      }
    }

    default: {
      return state
    }
  }
};

const routerInterfacePorts = (state = {loading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_ROUTER_INTERFACE_PORTS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_ROUTER_INTERFACE_PORTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.ports
      }
    }

    default: {
      return state
    }
  }
};

export { ports, routerPorts, routerInterfacePorts };
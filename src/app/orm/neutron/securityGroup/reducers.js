const securityGroups = (state = { loading: false, data: []}, action) => {
  switch(action.type) {
    case 'GET_SECURITY_GROUPS_SUCCESS':{
      return {
        ...state,
        loading: false,
        data: action.securityGroups
      }
    }

    case 'GET_SECURITY_GROUPS_REQUEST': {
      return {
        loading: true
      }
    }

    default: {
      return state;
    }
  }
};

export { securityGroups };
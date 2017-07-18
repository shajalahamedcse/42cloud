const initialState = {
};

const overviewReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOAD_TOKEN_DATA_SUCCESS': {

      return {
        ...state,
      }
    }

    default: {
      return state;
    }
  }
};

export default overviewReducer;

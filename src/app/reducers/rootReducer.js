import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import overviewReducer from 'features/overview/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  overview: overviewReducer
});

export default rootReducer;
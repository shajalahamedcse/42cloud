import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import overviewReducer from 'features/overview/reducers';
import instanceReducer from 'features/instance/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  overview: overviewReducer,
  instance: instanceReducer
});

export default rootReducer;
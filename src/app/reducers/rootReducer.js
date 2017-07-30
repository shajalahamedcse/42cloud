import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import orm from 'app/orm/reducer';
import features from 'app/reducers/features';

const rootReducer = combineReducers({
  auth: authReducer,
  orm,
  features,
});

export default rootReducer;
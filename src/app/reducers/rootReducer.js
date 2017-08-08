import { combineReducers } from 'redux';
import orm from 'app/orm/reducer';
import features from 'app/reducers/features';

const rootReducer = combineReducers({
  orm,
  features,
});

export default rootReducer;
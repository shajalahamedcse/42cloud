import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import volume from 'features/volume/reducers';

const features = combineReducers({
  volume,
});

export default features;


import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import volume from 'features/volume/reducers';
import instance from 'features/instance/reducers';

const features = combineReducers({
  volume,
  instance,
});

export default features;


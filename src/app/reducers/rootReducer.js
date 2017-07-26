import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import overviewReducer from 'features/overview/reducers';
import instanceReducer from 'features/instance/reducers';
import imageReducer from 'features/image/reducers';
import volumeReducer from 'features/volume/reducers';
import keypairReducer from 'features/keypair/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  overview: overviewReducer,
  instance: instanceReducer,
  image: imageReducer,
  volume: volumeReducer,
  keypair: keypairReducer
});

export default rootReducer;
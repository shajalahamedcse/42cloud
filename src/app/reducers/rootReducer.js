import { combineReducers } from 'redux';
import authReducer from 'features/login/reducers';
import overviewReducer from 'features/overview/reducers';
import instanceReducer from 'features/comnet/instance/reducers';
import imageReducer from 'features/comnet/image/reducers';
import volumeReducer from 'features/storage/volume/reducers';
import sshReducer from 'features/security/ssh/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  overview: overviewReducer,
  instance: instanceReducer,
  image: imageReducer,
  volume: volumeReducer,
  ssh: sshReducer
});

export default rootReducer;
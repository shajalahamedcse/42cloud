import { combineReducers } from 'redux';
import cinder from 'app/orm/cinder/reducer';
import glance from 'app/orm/glance/reducer';
import nova from 'app/orm/nova/reducer';

const orm = combineReducers({
  cinder,
  glance,
  nova,
});

export default orm;
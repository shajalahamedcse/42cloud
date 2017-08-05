import { combineReducers } from 'redux';
import cinder from 'app/orm/cinder/reducer';
import glance from 'app/orm/glance/reducer';
import nova from 'app/orm/nova/reducer';
import neutron from 'app/orm/neutron/reducer';
import influxdb from 'app/orm/influxdb/reducer';

const orm = combineReducers({
  cinder,
  glance,
  neutron,
  nova,
  influxdb,
});

export default orm;

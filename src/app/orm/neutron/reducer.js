import { combineReducers } from 'redux';
import { networks } from 'app/orm/neutron/network/reducers';
import { subnets } from 'app/orm/neutron/subnet/reducers';
import { securityGroups } from 'app/orm/neutron/securityGroup/reducers';
import { routers } from 'app/orm/neutron/router/reducers';
import { ports } from 'app/orm/neutron/port/reducers';

const neutron = combineReducers({
  networks,
  subnets,
  securityGroups,
  routers,
  ports,
});

export default neutron;
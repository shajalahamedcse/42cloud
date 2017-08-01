import { combineReducers } from 'redux';
import { networks } from 'app/orm/neutron/network/reducers';
import { securityGroups } from 'app/orm/neutron/securityGroup/reducers';

const neutron = combineReducers({
  networks,
  securityGroups,
});

export default neutron;
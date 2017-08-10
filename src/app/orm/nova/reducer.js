import { combineReducers } from 'redux';
import { servers, server, serversInfo, consoleOutput } from 'app/orm/nova/server/reducers';
import { flavors } from 'app/orm/nova/flavor/reducers';
import { keypairs } from 'app/orm/nova/keypair/reducers';
import { quotaSet } from 'app/orm/nova/quota/reducers';

const nova = combineReducers({
  serversInfo,
  servers,
  server,
  consoleOutput,
  flavors,
  keypairs,
  quotaSet,
});

export default nova;

import { combineReducers } from 'redux'
import { identityReducer, isLoggedReducer } from '../../features/login/reducers'

const rootReducer = combineReducers({
  identity: identityReducer,
  isLogged: isLoggedReducer
})

export default rootReducer;
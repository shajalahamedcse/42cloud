import { combineReducers } from 'redux'
import identityReducer from '../../features/login/reducers'

const rootReducer = combineReducers({
  identity: identityReducer
})

export default rootReducer;
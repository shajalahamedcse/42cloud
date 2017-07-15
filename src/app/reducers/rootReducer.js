import { combineReducers } from 'redux'
import authReducer from '../../features/login/reducers'

const rootReducer = combineReducers({
  auth: authReducer
})

export default rootReducer;
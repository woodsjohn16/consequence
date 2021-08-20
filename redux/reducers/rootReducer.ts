import { combineReducers } from 'redux'
import accounts from './userAccountsReducer'

// COMBINED REDUCERS
const reducers = {
  accounts: accounts,
}

export default combineReducers(reducers)
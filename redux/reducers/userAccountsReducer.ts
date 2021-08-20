import { userAccountsConstants } from '../constants/userAccountsConstants'

const defaultState = {
  loading: false,
  error: null,
  accounts: [],
  accountInformations: [],
}

export default function formReducer(
  state: any = defaultState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case userAccountsConstants.LOADING:
      return { ...state, loading: true }
    case userAccountsConstants.SET_ACCOUNTS:
      return { ...state, accounts: action.payload, loading: false }
    case userAccountsConstants.GET_ACCOUNTS_INFO:
      return { ...state, accountInformations: {
        ...state.accountInformations,
        [action.payload.accountID]: action.payload.transactions
      }, loading: false }
    default:
      return state
  }
}

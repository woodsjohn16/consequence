import { getUserAccounts, getUserAccountInfo } from '../../service/api/api'
import { userAccountsConstants } from '../constants/userAccountsConstants'

export const setLoading = () => ({
  type: userAccountsConstants.LOADING,
})

export const getAccountsAction = (data) => ({
  type: userAccountsConstants.SET_ACCOUNTS,
  payload: data,
})

export const getAccountTransactionAction = (data) => ({
  type: userAccountsConstants.GET_ACCOUNTS_INFO,
  payload: data,
})

export const getAccountTransaction = (accountID) => async (dispatch,getState,services) => {
  const accountTransactions = await getUserAccountInfo(accountID)
  dispatch(setLoading())
  try {
    dispatch(getAccountTransactionAction({
      accountID: accountID,
      transactions: accountTransactions.data.transactions
    }))
  } catch (e) {
    console.log(e.message)
  }
}

export const getAccounts = () => async (dispatch, getState) => {
  dispatch(setLoading())
  try {
    let accountsArray = []
    let newArray
    const userAccounts = await getUserAccounts()
    userAccounts.data.accounts.map((account, idx) => {
      newArray = {
        key: idx,
        account_type: account.account_type,
        account_id: account.account_id,
        data: account.data,
      }
      accountsArray.push(newArray)
    })
    dispatch(getAccountsAction(accountsArray))
  } catch (err) {
    console.log(err)
  }
}

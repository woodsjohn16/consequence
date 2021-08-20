import { createSelector } from "reselect"

const userAccountsState = (state: any) => state.accounts

export const makeSelectUserAccounts = createSelector(
    userAccountsState,
    accounts => accounts
)

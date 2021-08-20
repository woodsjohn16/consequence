import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { makeSelectUserAccounts } from '../../redux/selector/userAccounts'
import { getAccountTransaction } from '../../redux/actions/userAccountsAction'

import TransactionsTable from '../../components/accountTransactions/transactionsTable'
import Loading from '../../components/loading/loading'

const AccountInfo = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { accountInfo } = router.query
  const transactions: any = accountInfo
  const { loading, accountInformations } = useSelector(makeSelectUserAccounts)

  useEffect(() => {
    if (accountInformations[transactions]) {
      console.log(accountInformations[transactions])
    } else {
      if (accountInfo) dispatch(getAccountTransaction(accountInfo))
    }
  }, [accountInfo])

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <TransactionsTable
          data={
            accountInformations[transactions]
              ? accountInformations[transactions]
              : ''
          }
        />
      )}
    </div>
  )
}

export default AccountInfo

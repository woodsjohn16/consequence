import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { Grid, Container } from '@material-ui/core'

import { makeSelectUserAccounts } from '../../redux/selector/userAccounts'
import { getAccountTransaction } from '../../redux/actions/userAccountsAction'

import TransactionsTable from '@components/accountTransactions/transactionsTable'
import MerchantsChart from '@components/accountTransactions/merchantsCharts'
import Loading from '@components/loading/loading'

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
    <div className="account-transactions">
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="center"
            // alignItems="center"
            spacing={5}
          >
            <Grid item lg={6} sm={10}>
              <div className="content-container">
                <TransactionsTable
                  data={
                    accountInformations[transactions]
                      ? accountInformations[transactions]
                      : ''
                  }
                />
              </div>
            </Grid>
            <Grid item lg={6} sm={12}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item sm={12}>
                  <MerchantsChart
                    data={
                      accountInformations[transactions]
                        ? accountInformations[transactions]
                        : ''
                    }
                  />
                </Grid>
                <Grid item sm={12}>
                  <MerchantsChart
                    data={
                      accountInformations[transactions]
                        ? accountInformations[transactions]
                        : ''
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  )
}

export default AccountInfo

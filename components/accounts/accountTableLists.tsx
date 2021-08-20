import React from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import AccountTableHead from './accountTableHead'

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
})

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2()
  const router = useRouter()
  const { accounts } = props
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const headCells = [
    {
      id: 'accountNumber',
      numeric: false,
      label: 'Account Number',
    },
    { id: 'accountType', numeric: false, label: 'Account Type' },
  ]

  React.useEffect(() => {}, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sm={12} lg={6}>
        {accounts.length > 0 && (
          <TableContainer component={Paper} className="table-container">
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <AccountTableHead classes={classes} rowCount={accounts.length} headers={headCells} />
              <TableBody>
                {accounts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => {
                          router.push(`/account/${row.account_id}`)
                        }}
                        key={index}
                      >
                        <TableCell component="th" scope="row">
                          {row.data.account_number
                            ? row.data.account_number.number
                            : `XXXX-XXXX-XXXX-${row.data.partial_card_number}`}
                        </TableCell>
                        <TableCell>
                          {row.data.card_network
                            ? row.data.card_network
                            : row.data.account_type}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      20,
                      30,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={accounts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    className="table-footer"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  )
}

import React, { useState } from 'react'
import router from 'next/router'
import moment from 'moment'
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Grid,
  TableHead
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import AccountTableHead from '../accounts/accountTableHead'

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
})

const TransactionsTable = (props) => {
  const { data } = props

  const headers = [
    {
      id: 'description',
      numeric: false,
      label: 'Description',
    },
    { id: 'accountType', numeric: false, label: 'Account Type' },
  ]

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const classes = useStyles2()

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
        {data.length > 0 && (
          <TableContainer component={Paper} className="table-container">
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      20,
                      30,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={0}
                    count={data.length}
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
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell component="th" scope="row">
                          <div className="title">{row.data.description}</div>
                          <div>
                            {moment(row.data.timestamp).format('DD MMMM')}
                          </div>
                        </TableCell>
                        <TableCell>
                          {row.data.running_balance &&
                            row.data.running_balance.currency}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  )
}

export default TransactionsTable

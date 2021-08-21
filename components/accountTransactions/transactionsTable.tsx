import React from 'react'
import moment from 'moment'
import {
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableHead,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
})

const TransactionsTable = (props) => {
  const { data } = props

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      {data.length > 0 && (
        <TableContainer className="table-container">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
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
                        <div className="small-caption">
                          {moment(row.data.timestamp).format('DD MMMM')}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="emphasize">{row.data.amount}</div>
                        <div className="small-caption">
                          {row.data.running_balance &&
                            `${row.data.running_balance.currency} ${row.data.running_balance.amount}`}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default TransactionsTable

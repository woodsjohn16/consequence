import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core'
import React from 'react'

export default function accountTableHead(props) {
  const { headers } = props;

  return (
    <TableHead className="table-head">
      <TableRow>
        {headers && headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.numeric ? 'right' : 'left'}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

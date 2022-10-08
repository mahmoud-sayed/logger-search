import React from 'react';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { TableSortLabel, TableHead, TableRow, TableCell, Box } from '@mui/material';
const headCells = [
  {
    id: 'logId',
    numeric: false,
    disablePadding: false,
    label: 'Log ID',
  },
  {
    id: 'applicationType',
    numeric: false,
    disablePadding: false,
    label: 'Application Type',
  },
  {
    id: 'applicationId',
    numeric: false,
    disablePadding: false,
    label: 'Application ID',
  },
  {
    id: 'actionType',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
  {
    id: 'actionDetails',
    numeric: false,
    disablePadding: false,
    label: 'Action Details',
  },
  {
    id: 'creationTimestamp',
    numeric: false,
    disablePadding: false,
    label: 'Date:Time',
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;


  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}

          >
            <TableSortLabel
              active={true}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ '& .MuiTableSortLabel-icon': { fill: '#1565C0', backgroundColor: '#1565C020', borderRadius: '50%' } }}

            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead;
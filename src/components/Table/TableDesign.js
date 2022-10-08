import React, { useState, useEffect } from 'react';
import axios from 'axios';

//MUI Imports
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Grid, Stack, TableSortLabel, TableRow, Paper, Pagination, TablePagination, TableHead, TableContainer, TableCell, TableBody, Table, Box } from '@mui/material';
import SearchBar from '../Searcbar/SearchBar';
//import SearchBar from "material-ui-search-bar";




// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  {
    id: 'Log ID',
    numeric: false,
    disablePadding: false,
    label: 'Log ID',
  },
  {
    id: 'Application Type',
    numeric: false,
    disablePadding: false,
    label: 'Application Type',
  },
  {
    id: 'Application',
    numeric: false,
    disablePadding: false,
    label: 'Application ID',
  },
  {
    id: 'Action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
  {
    id: 'Action Details',
    numeric: false,
    disablePadding: false,
    label: 'Action Details',
  },
  {
    id: 'Date:Time',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
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
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TableDesign = () => {
  const [data, setData] = useState([]); // fetched data From server
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('logId');
  const [page, setPage] = useState(0);
  const [searchResult, setSearchResult] = useState();
  const [searched, setSearched] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const URL = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f'; // Data URL

  // fetching data
  useEffect(() => {
    try {

      const fetchData = async () => {
        const response = await axios.get(URL);
        if (response) {
          setData(response.data.result.auditLog);
        };
      };
      fetchData();

    } catch (error) {
      console.log(error);
    }

  }, []);

  //here we set the data to 
  const rows = data;


  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSearchResult(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);

  };





  return (
    <Box sx={{ width: '100%', marginBottom: '1rem' }}>
      <Grid width='100%' container spacing={2}>
        <SearchBar data={data} />
        <Grid width='100%' item>
          <Paper sx={{ width: '100%', mb: 2 }} elevation={3}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750, paddingLeft: '10px' }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <EnhancedTableHead

                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover key={row.logId} sx={{ fontSize: '10px' }}>
                          <TableCell
                            sx={{ fontSize: '12px' }}
                            component="th" id={labelId}
                            scope="row" padding="normal"
                          >
                            {row.logId}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: '12px' }}
                            align="left"
                          >
                            {row.applicationType?.replaceAll('_', ' ')}
                          </TableCell>
                          <TableCell sx={{ fontSize: '12px' }} align="left">{row.applicationId}</TableCell>
                          <TableCell sx={{ fontSize: '12px' }} align="left">{row.actionType?.replaceAll('_', ' ')}</TableCell>
                          <TableCell sx={{ fontSize: '12px', }} align="left">{!row.actionDetails ? '-/-' : row.actionDetails}</TableCell>
                          <TableCell sx={{ fontSize: '12px' }} align="left">{row.creationTimestamp?.replaceAll(' ', ' / ')}</TableCell>
                        </TableRow>
                      );
                    })}

                </TableBody>
              </Table>
            </TableContainer>
            <Stack alignItems='center'>
              <Pagination count={10} shape="rounded" sx={{ padding: '1rem 0' }} />
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableDesign;
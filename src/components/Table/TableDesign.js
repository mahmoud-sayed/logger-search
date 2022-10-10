import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnhancedTableHead from './../EnhancedTableHead/EnhancedTableHead';

//MUI Imports

import { Grid, Stack, TableRow, Paper, Pagination, TableContainer, TableCell, TableBody, Table, Box } from '@mui/material';
import SearchBar from '../Searcbar/SearchBar';
//import SearchBar from "material-ui-search-bar";


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




const calculateNumberPages = (totalNumberItems, numberItemsInPage = 10) => {
  var numberPages = Math.floor(totalNumberItems / numberItemsInPage);
  if (totalNumberItems % numberItemsInPage !== 0) {
    numberPages += 1;
  }
  return numberPages;
};

const TableDesign = () => {
  const [rows, setRows] = useState([]); // fetched data From server
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('logId');
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [dataAfterCheck, setDataAfterCheck] = useState([]);
  console.log({ dataAfterCheck });
  const URL = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f'; // Data URL

  // fetching data
  useEffect(() => {
    try {

      const fetchData = async () => {
        const response = await axios.get(URL);
        if (response) {
          setRows(response.data.result.auditLog);
        };
      };
      fetchData();

    } catch (error) {
      console.log(error);
    }

  }, []);



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

  const handlePaginationChange = (event, page) => {
    setPageNum(page);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '1rem' }}>
      <Grid width='100%' container spacing={2}>
        <SearchBar data={rows} URL={URL} setRows={setRows} setDataAfterCheck={setDataAfterCheck} />
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
                  {stableSort(dataAfterCheck.length > 0 ? dataAfterCheck : rows, getComparator(order, orderBy))
                    .slice((pageNum - 1) * rowsPerPage, pageNum * rowsPerPage)
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
              <Pagination
                count={calculateNumberPages((dataAfterCheck.length > 0 ? dataAfterCheck : rows)?.length || 0, rowsPerPage)}
                onChange={handlePaginationChange}
                siblingCount={0}
                shape="rounded"
                sx={{ padding: '1rem 0' }}
                hidePrevButton={pageNum === 1 ? true : false}
                hideNextButton={pageNum === (dataAfterCheck.length > 0 ? dataAfterCheck : rows).length / rowsPerPage ? true : false}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableDesign;





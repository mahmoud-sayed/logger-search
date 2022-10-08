import React, { useState, useEffect } from 'react';
import { Button, Grid, InputAdornment, TextField, InputLabel, MenuItem, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// options={top100Films}
const SearchBar = ({ data }) => {
  const [value, setValue] = useState(dayjs());
  const [actionTypeOptions, setActionTypeOptions] = useState([]);


  useEffect(() => {
    const ActionTypes = data.map((d) => {

      return { label: d.actionType?.replaceAll('_', ' ') };
    });
    setActionTypeOptions(ActionTypes);
  }, []);

  return (
    <Grid container item wrap='nowrap' spacing={2}>
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Employee Name</InputLabel>
        <TextField id="outlined-basic" variant="outlined" size="small" placeholder='e.g. Admin.User' />
      </Grid>

      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Action type</InputLabel>
        <Autocomplete
          disablePortal
          options={actionTypeOptions}
          id="combo-box-demo"
          size='small'
          sx={{ minWidth: 190 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Application type</InputLabel>
        <Autocomplete
          disablePortal
          options={actionTypeOptions}
          id="combo-box-demo"
          size='small'
          sx={{ minWidth: 190 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item alignSelf='center' width='normal'>
        <LocalizationProvider Grid container item dateAdapter={AdapterDayjs}>
          <Grid container item wrap='nowrap' spacing={2} alignSelf='center' justifyContent='center'>
            <Grid item>
              <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>From Date</InputLabel>
              <MobileDatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} size='small' placeholder='select date' />}
              />
            </Grid>
            <Grid item>
              <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>To Date</InputLabel>
              <MobileDatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} size='small' />}

              />
            </Grid>
          </Grid>
        </LocalizationProvider>

      </Grid >
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Application ID</InputLabel>
        <TextField id="outlined-basic" variant="outlined" size="small" placeholder='e.g. 219841/2021' />
      </Grid>
      <Grid item alignSelf='end' sx={{ mb: '2px' }}>
        <Button fullWidth variant='contained' color='primary' size="large" sx={{ fontSize: '10px', whiteSpace: 'nowrap', height: '100%', paddingTop: '.66rem', paddingBottom: '.66rem' }} >Search Logger</Button>
      </Grid>
    </Grid >
  );
};

export default SearchBar;
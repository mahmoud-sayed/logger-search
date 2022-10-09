import React, { useState, useEffect } from 'react';
import { Button, Grid, InputAdornment, TextField, InputLabel, MenuItem, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import moment from 'moment';

const SearchBar = ({ data, URL, setRows }) => {
  const [value, setValue] = useState(dayjs());
  const [actionTypeOptions, setActionTypeOptions] = useState({});
  const [applicationType, setApplicationType] = useState({});
  const [dataToFilter, setDataToFilter] = useState({
    employeeName: '',
    actionType: { key: '', value: '' },
    applicationType: { key: '', value: '' },
    from: null,
    to: null,
    applicationId: ''
  });



  useEffect(() => {
    let actionTypeValue = {};
    let appType = {};
    data.map((d) => {
      if (d.actionType) {
        actionTypeValue = {
          ...actionTypeValue,
          [d.actionType?.replaceAll('_', ' ')]: d.actionType
        };
      }
      if (d.applicationType) {
        appType = {
          ...appType,
          [d.applicationType?.replaceAll('_', ' ')]: d.applicationType
        };
      }
      return d;
    });
    setActionTypeOptions(actionTypeValue);
    setApplicationType(appType);
  }, [data]);



  const handelFilter = (e) => {
    console.log({ [e.target.name]: e.target.value, e });
    console.log({ dataToFilter });
    if (e.target.name === 'actionType') {
      console.log(e.target.value, actionTypeOptions, actionTypeOptions[e.target.value]);

      setDataToFilter({
        ...dataToFilter,
        [e.target.name]: { key: e.target.value, value: actionTypeOptions[e.target.value] },
      });
    } else if (e.target.name === 'applicationType') {
      console.log(e.target.value, applicationType, applicationType[e.target.value]);
      setDataToFilter({
        ...dataToFilter,
        [e.target.name]: { key: e.target.value, value: applicationType[e.target.value] },
      });
    } else {
      setDataToFilter({
        ...dataToFilter,
        [e.target.name]: e.target.value,
      });
    };
  };

  const ShowSearchResult = async (e) => {
    e.preventDefault();

    const req = await axios.get(`${URL}?employeeName=${dataToFilter.employeeName}&actionType=${dataToFilter.actionType.value}&applicationType=${dataToFilter.applicationType.value}&from=${dataToFilter.from}&to=${dataToFilter.to}&applicationId=${dataToFilter.applicationId}`);
    console.log(req);

    setRows(req.data.result.auditLog);
  };

  return (
    <Grid container item wrap='nowrap' spacing={2}>
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Employee Name</InputLabel>
        <TextField
          name='employeeName'
          id="outlined-basic"
          variant="outlined"
          size="small"
          placeholder='e.g. Admin.User'
          onChange={handelFilter}
          value={dataToFilter.employeeName}
        />
      </Grid>

      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Action type</InputLabel>
        <Autocomplete
          name='actionType'
          disablePortal
          options={Object.keys(actionTypeOptions)}
          id="combo-box-demo"
          size='small'
          sx={{ minWidth: 190 }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e, val) => {
            console.log({ val });
            handelFilter({ target: { name: 'actionType', value: val } });
          }}
          value={dataToFilter.actionType.key}
          isOptionEqualToValue={(option, value) => option === dataToFilter.actionType.key}

        />
      </Grid>
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Application type</InputLabel>
        <Autocomplete
          name='applicationType'
          disablePortal
          options={Object.keys(applicationType)}
          id="combo-box-demo-2"
          size='small'
          sx={{ minWidth: 190 }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e, val) => {
            console.log({ val });
            handelFilter({ target: { name: 'applicationType', value: val } });
          }}
          value={dataToFilter.applicationType.key}
          isOptionEqualToValue={(option, value) => option === dataToFilter.applicationType.key}

        />
      </Grid>
      <Grid item alignSelf='center' width='normal'>
        <LocalizationProvider Grid container item dateAdapter={AdapterDayjs}>
          <Grid container item wrap='nowrap' spacing={2} alignSelf='center' justifyContent='center'>
            <Grid item>
              <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>From Date</InputLabel>
              <MobileDatePicker
                name='from'
                value={dataToFilter.from}
                onChange={(newValue) => {
                  handelFilter(
                    { target: { name: 'from', value: moment(newValue).format('DD-MM-YYYY hh:mm:ss') } }
                  );
                }}
                renderInput={(params) => <TextField {...params} size='small' placeholder='select date' />}

              />
            </Grid>
            <Grid item>
              <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>To Date</InputLabel>
              <MobileDatePicker
                name='to'
                value={dataToFilter.to}
                onChange={(newValue) => {
                  setValue(newValue);
                  handelFilter(
                    { target: { name: 'to', value: moment(newValue).format('DD-MM-YYYY hh:mm:ss') } }
                  );
                }}
                renderInput={(params) => <TextField {...params} size='small' placeholder='select date' />}

              />
            </Grid>
          </Grid>
        </LocalizationProvider>

      </Grid >
      <Grid item alignSelf='center'>
        <InputLabel shrink htmlFor="my-input" sx={{ fontWeight: 'Bold' }}>Application ID</InputLabel>
        <TextField
          name='applicationId'
          id="outlined-basic"
          variant="outlined"
          size="small"
          placeholder='e.g. 219841/2021'
          onChange={handelFilter}
          value={dataToFilter.applicationId}
        />
      </Grid>
      <Grid item alignSelf='end' sx={{ mb: '2px' }}>
        <Button fullWidth variant='contained' color='primary' size="large" sx={{ fontSize: '10px', whiteSpace: 'nowrap', height: '100%', paddingTop: '.66rem', paddingBottom: '.66rem' }} onClick={ShowSearchResult}>Search Logger</Button>
      </Grid>
    </Grid >
  );
};

export default SearchBar;
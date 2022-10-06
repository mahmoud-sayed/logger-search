import React, { Fragment } from 'react';
import { Breadcrumbs, Typography, Link, Stack, } from '@mui/material';

const Breadcrumb = () => {

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }


  const breadcrumbs = [
    <Link underline="hover" key="1" color="Primary" href="#" onClick={handleClick}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="Primary"
      href="#"
      onClick={handleClick}
    >
      Administration
    </Link>,
    <Typography key="3" color="text.secondary">
      Logger search
    </Typography>,
  ];


  return (
    <Fragment >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Fragment>
  );
};

export default Breadcrumb;
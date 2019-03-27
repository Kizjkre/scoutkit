import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import style from './../style';
import NavBar from './NavBar';

function Body() {
  return (
    <div>
      <Typography variant='h1'>ScoutKit</Typography>
      <NavBar />
    </div>
  );
}

export default withStyles(style)(Body);

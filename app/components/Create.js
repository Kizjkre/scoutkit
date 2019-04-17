import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import fs from 'fs';
import style from './../constants/style';
import { withStyles } from '@material-ui/core';
import { Add as BackIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { dataPath } from '../constants/appData';

function Create(props) {
  save();
  return (
    <div>
      <AppBar className={ props.classes.appBar } position='fixed'>
        <Toolbar className={ props.classes.navToolbar }>
          <Link className={ props.classes.btnNavbar } to='/'>
            <IconButton color='inherit'>
                <BackIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function save() {
  console.log(window.location.href);
	// fs.writeFileSync(`${ dataPath }/${  }`);
}

export default withStyles(style)(Create);

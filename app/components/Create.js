import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';
import { ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fs from 'fs';
import style from '../constants/style';
import { dataPath, formatDir } from '../constants/constants';

Create.defaultProps = {
  classes: {}
};

Create.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape)
};

/**
 * Create component
 *
 * The /create page, for creating a new app
 * Navbar is fixed to the bottom
 * - Contains a back button to go back to '/'
 */
function Create(props) {
  init();
  const { classes } = props;
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.navToolbar}>
          <Link className={classes.btnNavbar} color="inherit" to="/">
            <IconButton color="inherit">
              <ArrowBackIosIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

/**
 * Reads to check if app already exists
 * Creates a temporary autosave file
 */
function init() {
  document.addEventListener('create', e => {
    const path = `${dataPath}/app-${formatDir(e.detail)}/`;
    const contents = fs.readdirSync(path);
    if (!contents.includes('autosave.json')) {
      const data = {
        name: e.detail
      };
      fs.writeFileSync(`${path}autosave.json`, data);
    }
  });
}

export default withStyles(style)(Create);

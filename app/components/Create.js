import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';
import { Add as BackIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from '../constants/style';

Create.defaultProps = {
  classes: {}
};

Create.propTypes = {
  classes: PropTypes.shape
};

/**
 * Create component
 *
 * The /create page, for creating a new app
 * Like ./index/NavBar.js, navbar is fixed to the bottom
 * - Contains a back button to go back to '/'
 * TODO: get name working, in progress save
 */
function Create(props) {
  save();
  const { classes } = props;
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.navToolbar}>
          <Link className={classes.btnNavbar} color="inherit" to="/">
            <IconButton color="inherit">
              <BackIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

/**
 * Saves the app by create a directory and name.txt file
 * TODO: fix
 */
function save() {
  console.log(window.location.href);
  // fs.writeFileSync(`${ dataPath }/${  }`);
}

export default withStyles(style)(Create);

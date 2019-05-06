import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import fs from 'fs';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import style from '../constants/style';
import Body from './index/Body';
import { dataPath } from '../constants/constants';

Home.defaultProps = {
  classes: {}
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape)
};

/**
 * Home component
 *
 * Displays the home screen when the app loads
 */
function Home(props) {
  init();
  const { classes } = props;
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Body />
    </div>
  );
}

/**
 * Checks if the /data and /data/resources folder exists, and creates one if not
 */
function init() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync('/data/resources');
  }
}

export default withStyles(style)(Home);

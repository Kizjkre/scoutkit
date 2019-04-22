import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Help as HelpIcon } from '@material-ui/icons';
import style from '../../constants/style';
import HelpModal from './HelpModal';
import AppModal from './AppModal';

NavBar.defaultProps = {
  classes: {}
};

NavBar.propTypes = {
  classes: PropTypes.shape
};

/**
 * NavBar component
 *
 * Creates the navbar for the homepage, fixed to the bottom
 * Contains:
 * - A floating action button to open the app modal (see AppModal.js)
 * - A help button for using the app TODO: implement
 */
function NavBar(props) {
  const [openAppModal, setOpenAppModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const { classes } = props;
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.navToolbar}>
          <Fab
            className={classes.navFabButton}
            color="secondary"
            onClick={() => setOpenAppModal(true)}
          >
            <AddIcon />
          </Fab>
          <IconButton
            className={classes.btnNavbar}
            color="inherit"
            onClick={() => setOpenHelpModal(true)}
          >
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppModal onClose={() => setOpenAppModal(false)} open={openAppModal} />
      <HelpModal onClose={() => setOpenHelpModal(false)} open={openHelpModal} />
    </>
  );
}

export default withStyles(style)(NavBar);

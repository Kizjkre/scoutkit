import React, { useState } from 'react';
import AppModal from './AppModal';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import HelpModal from './HelpModal';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import style from '../../constants/style';
import { withStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Help as HelpIcon } from '@material-ui/icons';

function NavBar(props) {
  let [openAddApp, setOpenAddApp] = useState(false);
  let [openHelpModal, setOpenHelpModal] = useState(false);
  return (
    <>
      <AppBar className={ props.classes.appBar } position='fixed'>
        <Toolbar className={ props.classes.navToolbar }>
          <Fab
            className={ props.classes.navFabButton }
            color='secondary'
            onClick={ () => setOpenAddApp(true) }
          >
            <AddIcon />
          </Fab>
          <IconButton
            className={ props.classes.btnNavbar }
            color='inherit'
            onClick={ () => setOpenHelpModal(true) }
          >
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppModal onClose={ () => setOpenAddApp(false) } open={ openAddApp } />
      <HelpModal
        onClose={ () => setOpenHelpModal(false) }
        open={ openHelpModal }
      />
    </>
  );
}

export default withStyles(style)(NavBar);

import React, { useState } from 'react';
import AddApp from './AddApp';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import HelpModal from './HelpModal';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import style from '../style';
import { withStyles } from '@material-ui/core/styles';
import { AddIcon, HelpIcon } from '../Utils';

function NavBar(props) {
  let [openAddApp, setOpenAddApp] = useState(false);
  let [openHelpModal, setOpenHelpModal] = useState(false);
  return (
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
          className={ props.classes.btnHelp }
          color='inherit'
          onClick={ () => setOpenHelpModal(true) }
        >
          <HelpIcon />
        </IconButton>
      </Toolbar>
      <AddApp onClose={ () => setOpenAddApp(false) } open={ openAddApp } />
      <HelpModal onClose={ () => setOpenHelpModal(false) } open={ openHelpModal } />
    </AppBar>
  );
}

export default withStyles(style)(NavBar);

import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import style from '../../../constants/style';
import { listApps } from '../../../constants/appData';
import { withStyles } from '@material-ui/core';

function SwitchApp(props) {
  let apps = listApps();
  useEffect(() => {
    apps = listApps();
  });
  return (
    <Dialog onClose={ props.onClose } open={ props.open }>
      <DialogTitle>Switch Apps</DialogTitle>
      {
        apps.names.length ?
          apps.names.map(n => (
            <List key={ n }>
              <ListItem button>
                <ListItemText primary={ n } />
              </ListItem>
            </List>
          )) :
          <DialogContent>
            <DialogContentText className={ props.classes.center }>
              No apps
            </DialogContentText>
          </DialogContent>
      }
    </Dialog>
  );
}

export default withStyles(style)(SwitchApp);

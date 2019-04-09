import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CreateApp from './app/CreateApp';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import SwitchApp from './app/SwitchApp';
import { AddIcon, AutorenewIcon, CloudUploadIcon } from '../Utils';

export default function AddApp(props) {
  let [openSwitchApp, setOpenSwitchApp] = useState(false);
  let [openCreateApp, setOpenCreateApp] = useState(false);
  return (
    <div>
      <Dialog onClose={ props.onClose } open={ props.open }>
        <DialogTitle>New App</DialogTitle>
        <List>
          <ListItem button onClick={ () => setOpenCreateApp(true) }>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Create App' />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <CloudUploadIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Load App' />
          </ListItem>
          <ListItem button onClick={ () => setOpenSwitchApp(true) }>
            <ListItemAvatar>
              <Avatar>
                <AutorenewIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Switch Apps' />
          </ListItem>
        </List>
        <SwitchApp
          onClose={ () => setOpenSwitchApp(false) }
          open={ openSwitchApp }
        />
      </Dialog>
      <CreateApp open={ openCreateApp } />
    </div>
  );
}

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { AddIcon, AutorenewIcon, CloudUploadIcon } from './../Icons';

export default function AddApp(props) {
  return (
    <Dialog onClose={ props.onClose } open={ props.open }>
      <DialogTitle>New App</DialogTitle>
      <List>
        <ListItem button>
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
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <AutorenewIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Switch Apps' />
        </ListItem>
      </List>
    </Dialog>
  );
}

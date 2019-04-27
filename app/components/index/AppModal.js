import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Add as AddIcon,
  Autorenew as AutorenewIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import SwitchApp from './app/SwitchApp';
import DeleteApp from './app/DeleteApp';
import CreateApp from './app/CreateApp';

AppModal.defaultProps = {
  onClose: () => {},
  open: false
};

AppModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

/**
 * AppModal component
 *
 * The main modal for interacting with apps
 * Contains four menu buttons:
 * - Create App
 * - Load App
 * - Switch App
 * - Delete App
 */
export default function AppModal(props) {
  const { onClose, open } = props;
  const [openSwitchApp, setOpenSwitchApp] = useState(false);
  const [openCreateApp, setOpenCreateApp] = useState(false);
  const [openDeleteApp, setOpenDeleteApp] = useState(false);
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>New App</DialogTitle>
        <List>
          <ListItem button onClick={() => setOpenCreateApp(true)}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create App" />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <CloudUploadIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Load App" />
          </ListItem>
          <ListItem button onClick={() => setOpenSwitchApp(true)}>
            <ListItemAvatar>
              <Avatar>
                <AutorenewIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Switch Apps" />
          </ListItem>
          <ListItem button onClick={() => setOpenDeleteApp(true)}>
            <ListItemAvatar>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete Apps" />
          </ListItem>
        </List>
      </Dialog>
      <SwitchApp onClose={() => setOpenSwitchApp(false)} open={openSwitchApp} />
      <CreateApp onClose={() => setOpenCreateApp(false)} open={openCreateApp} />
      <DeleteApp onClose={() => setOpenDeleteApp(false)} open={openDeleteApp} />
    </>
  );
}

import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from '../../../constants/style';
import { listApps } from '../../../constants/appData';

SwitchApp.defaultProps = {
  classes: {},
  onClose: () => {},
  open: false
};

SwitchApp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape),
  onClose: PropTypes.func,
  open: PropTypes.bool
};

/**
 * SwitchApp component
 *
 * Modal that allows the user to switch an app
 */
function SwitchApp(props) {
  const { classes, onClose, open } = props;
  let apps = listApps();
  useEffect(() => {
    apps = listApps();
  });
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Switch Apps</DialogTitle>
      {apps.names.length ? (
        apps.names.map(n => (
          <List key={n}>
            <ListItem button>
              <ListItemText primary={n} />
            </ListItem>
          </List>
        ))
      ) : (
        <DialogContent>
          <DialogContentText className={classes.center}>
            No apps
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default withStyles(style)(SwitchApp);

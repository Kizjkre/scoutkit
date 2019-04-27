import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from '../../../constants/style';
import { listApps, dataPath, rmrf } from '../../../constants/appData';

DeleteApp.defaultProps = {
  classes: {},
  onClose: () => {},
  open: false
};

DeleteApp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape),
  onClose: PropTypes.func,
  open: PropTypes.bool
};

/**
 * DeleteApp component
 *
 * A modal where the user can delete an app
 * A confirmation modal pops up to confirm delete
 */
function DeleteApp(props) {
  const { classes, onClose, open } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  let name = '';
  let apps = listApps();
  useEffect(() => {
    apps = listApps();
  });
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Delete Apps</DialogTitle>
        {apps.names.length ? (
          apps.names.map(n => (
            <List key={n}>
              <ListItem
                button
                onClick={() => {
                  setOpenConfirm(true);
                  name = window.event.target.innerText;
                }}
              >
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
      <Dialog onClose={() => setOpenConfirm(false)} open={openConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.center}>
            Delete {name}?
          </DialogContentText>
          <br />
          <Grid className={classes.center} container>
            <Grid
              item
              onClick={() => deleteApp(name, apps, setOpenConfirm, onClose)}
              sm={6}
            >
              <Button className={classes.fullWidth}>Yes</Button>
            </Grid>
            <Grid item onClick={() => setOpenConfirm(false)} sm={6}>
              <Button className={classes.fullWidth}>No</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Deletes the app with rm -rf
 * Two callbacks:
 * - First one to close the confirmation modal
 * - Second one to close the delete modal
 *   (due to a problem where app list wouldn't update)
 */
function deleteApp(name, apps, cb, cb2) {
  rmrf(`${dataPath}/${apps.dir[apps.names.indexOf(name)]}`);
  cb(false);
  cb2(false);
}

export default withStyles(style)(DeleteApp);

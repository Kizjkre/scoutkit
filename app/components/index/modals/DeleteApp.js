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
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import rimraf from 'rimraf';
import style from '../../../constants/style';
import { listApps, dataPath } from '../../../constants/constants';

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

let name = '';

/**
 * DeleteApp component
 *
 * A modal where the user can delete an app
 * A confirmation modal pops up to confirm delete
 */
function DeleteApp(props) {
  const { classes, onClose, open } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let apps = listApps();
  useEffect(() => {
    apps = listApps();
  });
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Delete Apps</DialogTitle>
        <List>
          {apps.names.length ? (
            apps.names.map(n => (
              <ListItem
                button
                key={n}
                onClick={() => {
                  setOpenConfirm(true);
                  name = window.event.target.innerText;
                }}
              >
                <ListItemText primary={n} />
              </ListItem>
            ))
          ) : (
            <DialogContent>
              <DialogContentText className={classes.center}>
                No apps
              </DialogContentText>
            </DialogContent>
          )}
        </List>
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
              onClick={() =>
                deleteApp(apps, () => {
                  setOpenConfirm(false);
                  onClose(false);
                  setOpenSnackbar(true);
                })
              }
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={`${name} deleted.`}
      />
    </>
  );
}

/**
 * Deletes the app with rm -rf
 * Three callbacks:
 * - First one to close the confirmation modal
 * - Second one to close the delete modal
 *   (due to a problem where app list wouldn't update)
 * - Third one to trigger the snackbar
 */
function deleteApp(apps, cb) {
  rimraf(`${dataPath}/${apps.dir[apps.names.indexOf(name)]}`, () => cb());
}

export default withStyles(style)(DeleteApp);

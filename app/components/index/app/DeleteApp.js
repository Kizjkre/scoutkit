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
import style from '../../../constants/style';
import { withStyles } from '@material-ui/core';
import { listApps, dataPath, rmrf } from '../../../constants/appData';

let name = '';
let apps = listApps();

function DeleteApp(props) {
  let [openConfirm, setOpenConfirm] = useState(false);
  useEffect(() => {
    apps = listApps();
  });
  return (
    <>
      <Dialog onClose={ props.onClose } open={ props.open }>
        <DialogTitle>Delete Apps</DialogTitle>
        {
          apps.names.length ?
            apps.names.map(n => (
              <List key={ n }>
                <ListItem
                  button
                  onClick={ () => {
                    setOpenConfirm(true);
                    name = event.target.innerText;
                  } }
                >
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
      <Dialog onClose={ () => setOpenConfirm(false) } open={ openConfirm }>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className={ props.classes.center }>
            Delete { name }?
          </DialogContentText>
          <br />
          <Grid className={ props.classes.center } container>
            <Grid
              item
              onClick={ () => deleteApp(name, setOpenConfirm, props.onClose) }
              sm={ 6 }
            >
              <Button className={ props.classes.fullWidth }>
                Yes
              </Button>
            </Grid>
            <Grid
              item
              onClick={ () => setOpenConfirm(false) }
              sm={ 6 }
            >
              <Button className={ props.classes.fullWidth }>
                No
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

function deleteApp(name, cb, cb2) {
  rmrf(`${ dataPath }/${ apps.dir[apps.names.indexOf(name)] }`);
	cb(false);
	cb2(false);
}

export default withStyles(style)(DeleteApp);

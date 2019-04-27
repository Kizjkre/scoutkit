import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import fs from 'fs';
import TextField from '@material-ui/core/TextField';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from '../../../constants/style';
import { listApps, dataPath } from '../../../constants/appData';

const apps = listApps();

CreateApp.defaultProps = {
  classes: {},
  onClose: () => {},
  open: false
};

CreateApp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape),
  onClose: PropTypes.func,
  open: PropTypes.bool
};

/**
 * CreateApp component
 *
 * A modal where the user can input the app name
 * Can click button or press enter to create app
 * TODO: fix to make it work with react-router, use enter key to create app
 */
function CreateApp(props) {
  const [name, setName] = useState();
  const { classes, onClose, open } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create App</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.appName}
          label="App Name"
          // onKeyPress={ () => createApp(name, props.onClose) }
          onChange={() => setName(window.event.target.value)}
        />
        <Link to={`/create?name=${name}`}>
          <IconButton color="primary" onClick={() => createApp(name, onClose)}>
            <AddIcon />
          </IconButton>
        </Link>
        <br />
        <br />
        <Divider />
        <br />
        <Button>Edit App</Button>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Creates the app
 * Accepts the name, and a callback function to close the modal
 */
function createApp(name, cb) {
  const dir = `app-${name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z1-9]+/g, '-')}`;
  if (!apps.dir.includes(dir)) {
    fs.mkdirSync(`${dataPath}/${dir}`);
    fs.writeFileSync(`${dataPath}/${dir}/name.txt`, name);
    cb(false);
  }
}

export default withStyles(style)(CreateApp);

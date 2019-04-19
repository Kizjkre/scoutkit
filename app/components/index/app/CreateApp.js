import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import fs from 'fs';
import style from '../../../constants/style';
import TextField from '@material-ui/core/TextField';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { listApps, dataPath } from '../../../constants/appData';

let apps = listApps();

function CreateApp(props) {
  let name;
  return (
    <Dialog onClose={ props.onClose } open={ props.open }>
      <DialogTitle>Create App</DialogTitle>
      <DialogContent>
        <TextField
          className={ props.classes.appName }
          label='App Name'
          // TODO: fix to make it work with react-router
          // onKeyPress={ () => createApp(name, props.onClose) }
          onChange={ () => name = event.target.value }
        />
        <Link to={ `/create?name=${ name }` }>
          <IconButton
            color='primary'
            onClick={ () => createApp(name, props.onClose) }
          >
            <AddIcon />
          </IconButton>
        </Link>
        <br />
        <Divider />
        <br />
        <Button>Edit App</Button>
      </DialogContent>
    </Dialog>
  );
}

function createApp(name, cb) {
  if (event.keyCode === 13 || event.type === 'click') {
    let dir = `app-${ name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^A-Za-z1-9]+/g, '-') }`;
    if (!apps.dir.includes(dir)) {
      fs.mkdirSync( `${ dataPath }/${ dir }`);
      fs.writeFileSync(`${ dataPath }/${ dir }/name.txt`, name);
      cb(false);
    }
  }
}

export default withStyles(style)(CreateApp);

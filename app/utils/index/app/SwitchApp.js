import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import fs from 'fs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { dataPath } from '../../Utils';

export default function SwitchApp(props) {
  let appNames = listApps();
  return (
    <Dialog onClose={ props.onClose } open={ props.open }>
      <DialogTitle>Switch Apps</DialogTitle>
      {
        appNames.map(n => (
          <List key={ n }>
            <ListItem button>
              <ListItemText primary={ n } />
            </ListItem>
          </List>
        ))
      }
    </Dialog>
  );
}

function listApps() {
  let
    apps = fs.readdirSync(dataPath).filter(e => e.includes('app-')),
    names = [];
  apps.length !== 0 && apps.forEach(e => names.push(
    fs.readFileSync(`${ dataPath }/${ e }/name.txt`, 'utf8')
  ));
  return names;
}

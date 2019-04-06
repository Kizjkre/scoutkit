import React from 'react';
import {
  Add,
  Autorenew,
  CloudUpload,
  Help
} from '@material-ui/icons';
import { remote } from 'electron';

const { app } = remote;
export const dataPath = `${ app.getPath('appData') }/ScoutKit/data`;

export function AddIcon() {
	return <Add />;
}

export function AutorenewIcon() {
	return <Autorenew />;
}

export function CloudUploadIcon() {
  return <CloudUpload />;
}

export function HelpIcon() {
	return <Help />;
}

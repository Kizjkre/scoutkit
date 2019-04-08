import React from 'react';
import fs from 'fs';
import style from '../../style';
import { dataPath } from '../../Utils';
import { withStyles } from '@material-ui/core';

function CreateApp(props) {
  return (
    <div className={ props.open ? props.classes.createApp : null }>
      <h1>hi</h1>
    </div>
  );
}

export default withStyles(style)(CreateApp);

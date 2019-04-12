import React from 'react';
import Body from './index/Body';
import CssBaseline from '@material-ui/core/CssBaseline';
import fs from 'fs';
import style from '../constants/style';
import { withStyles } from '@material-ui/core/styles';
import { dataPath } from '../constants/appData';


function Home(props) {
  init();
	return (
    <div className={ props.classes.main }>
      <CssBaseline />
      <Body />
    </div>
  );
}

function init() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync('/data/resources');
  }
}

export default withStyles(style)(Home);

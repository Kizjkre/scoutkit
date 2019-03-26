import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Body from './index/Body';
import style from './style';

function App(props) {
	return (
    <div className={ props.classes.main }>
      <CssBaseline />
      <Body />
    </div>
  );
}

export default withStyles(style)(App);

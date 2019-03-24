import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import style from './style';

function App(props) {
	return (
    <div className={ props.classes.main }>
      <CircularProgress color='secondary' />
    </div>
  );
}

export default withStyles(style)(App);

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../Routes';

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

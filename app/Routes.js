import React from 'react';
import { Route } from 'react-router';
import routes from './constants/routes';
import Home from './components/Home';
import Create from './components/Create';

export default () => (
  <>
    <Route component={Home} exact path={routes.HOME} />
    <Route component={Create} path={routes.CREATE} />
  </>
);

// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../features/home/home-page';



export function AppLayout() {
  return (
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>

  );
}



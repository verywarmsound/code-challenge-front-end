// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { HashRouter, Route, Switch } from 'react-router-dom';

import onEnter from './hoc/onEnter';
import { AppLayout } from './layouts/app-layout';
import { appInitStart } from './reducers/app';

import { store } from './store';

function handleAppInit(dispatch) {
  const state = store.getState();
  if (!state.app.initialized) {
    dispatch(appInitStart());
  }
}

export function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" component={onEnter(AppLayout, handleAppInit)} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

// eslint-disable-next-line no-undef
export const HotApp = hot(module)(App);

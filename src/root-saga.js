/* eslint-disable no-undef */

import { fork } from 'redux-saga/effects';

import appInitSaga from 'sagas/app-init-saga';
import appErrorSaga from 'sagas/app-error-saga';
import { getSimulationSaga } from './sagas/get-simulation-result-saga';

export default function* rootSaga() {
  try {
    yield fork(appInitSaga);
    yield fork(appErrorSaga);
    yield fork(getSimulationSaga);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Root saga error', e);
  }
}

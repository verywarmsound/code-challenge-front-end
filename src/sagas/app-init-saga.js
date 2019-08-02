// @flow
import { put, takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { APP_INIT_COMPLETE, APP_INIT_ERROR, APP_INIT_START } from '../reducers/app';

function* appInitHandler() {
  try {
    // eslint-disable-next-line no-console
    console.log('Provide init code here ...');
  } catch (e) {
    yield put({
      type: APP_INIT_ERROR,
      payload: { error: e.toString() }
    });
  } finally {
    yield put({ type: APP_INIT_COMPLETE });
  }
}

export default function* saga(): Saga<void> {
  yield takeLatest(APP_INIT_START, appInitHandler);
}

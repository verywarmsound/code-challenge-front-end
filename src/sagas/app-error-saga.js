// @flow

import { put, takeEvery, delay } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { APP_CLEAR_APP_NOTIFICATION, APP_SHOW_APP_NOTIFICATION } from '../reducers/app';

function* handleShowAppNotification() {
  yield delay(6000);
  yield put({ type: APP_CLEAR_APP_NOTIFICATION });
}

export default function* saga(): Saga<void> {
  yield takeEvery(APP_SHOW_APP_NOTIFICATION, handleShowAppNotification);
}

import { take, cancel, call, fork, delay } from 'redux-saga/effects';

/**
 * Debounce a saga for X milliseconds
 *
 * @param {String|Array|Function} pattern
 * @param {Function} saga
 * @param {Number} ms
 * @param {Array} args
 */
export function* debounce(pattern, saga, ms, ...args) {
  function* delayedSaga(action) {
    yield delay(ms);
    yield call(saga, action, ...args);
  }

  let task;
  while (true) {
    const action = yield take(pattern);
    if (task) {
      yield cancel(task);
    }

    task = yield fork(delayedSaga, action);
  }
}

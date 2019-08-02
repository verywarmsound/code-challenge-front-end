import { dataLoading, showResponseError } from '../../reducers/app';
import { put } from 'redux-saga/effects';

export type GetEntityInput = {
  getFn: () => Iterable,
  sagaEvents: {
    SAGA: string,
    START: string,
    SUCCESS: string,
    COMPLETE: string
  }
};

export function* getData({ getFn, sagaEvents }: GetEntityInput) {
  const key = sagaEvents.SAGA;
  try {
    yield put(dataLoading.start(key));
    yield put({ type: sagaEvents.START });
    const payload = yield getFn();
    if (payload) {
      yield put({ type: sagaEvents.SUCCESS, payload });
    }
  } catch (e) {
    yield put(showResponseError(sagaEvents.SAGA, e));
  } finally {
    yield put({ type: sagaEvents.COMPLETE });
    yield put(dataLoading.complete(key));
  }
}

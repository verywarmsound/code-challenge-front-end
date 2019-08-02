// @flow
import { put, takeLatest, call } from 'redux-saga/effects';
import type { Effect } from 'redux-saga';
import { getSimulationResult } from '../api/simulation-api';
import { GET_SIMULATION } from '../features/home';

function* getSimulationResultHandler(action): any {
  const  location  = action.payload;
  try {
    const response = yield call(getSimulationResult, location);
    const simulationResult = response && response.data;
    if (simulationResult) {
      yield put({ type: GET_SIMULATION.SUCCESS, payload: simulationResult });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function* getSimulationSaga(): Iterable<Effect> {
  yield takeLatest(GET_SIMULATION.SAGA, getSimulationResultHandler);
}

// @flow
import { combineReducers } from 'redux';
import { appReducer } from './reducers/app';
import { simulationResultReducer } from './features/home';

const rootReducer = combineReducers<*, *>({
  app: appReducer,
  simulationResult: simulationResultReducer
});

export default rootReducer;

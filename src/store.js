import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = composeEnhancers(applyMiddleware(sagaMiddleware))(createStore)(rootReducer);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
}

const { dispatch } = store;

sagaMiddleware.run(rootSaga);

export { store, dispatch };

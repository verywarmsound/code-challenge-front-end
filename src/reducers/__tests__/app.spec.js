import { appReducer, initialState } from '../app';

describe('reducers/app', () => {
  it('should return correct initial state', () => {
    const state = appReducer(initialState, { type: 'unknown-action' });
    expect(state).toEqual(initialState);
  });
});

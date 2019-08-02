import { simulationResultReducer, initialState, GET_SIMULATION } from '../index';

describe('Simulation index file', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      const nextState = simulationResultReducer(initialState, { type: 'non-existing-action' });
      expect(nextState).toMatchObject({
        booking_distance_bins: {},
        most_popular_dropoff_points: {},
        most_popular_pickup_points: {}
      });
    });


    it('GET_Simulation.SUCCESS should set Simulation', () => {
      const nextState = simulationResultReducer(initialState, {
        type: GET_SIMULATION.SUCCESS,
        payload: {
          booking_distance_bins: {a: '1'},
          most_popular_dropoff_points: {b: '1'},
          most_popular_pickup_points: {c: '1'}
        }
      });
      expect(nextState).toMatchObject({
        booking_distance_bins: {a: '1'},
        most_popular_dropoff_points: {b: '1'},
        most_popular_pickup_points: {c: '1'}
      });
    });
  });
  });

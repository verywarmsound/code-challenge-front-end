// @flow
export const GET_SIMULATION = {
  SAGA: 'SIMULATION/GET_SIMULATION/SAGA',
  SUCCESS: 'SIMULATION/GET_SIMULATION/SUCCESS',
  COMPLETE: 'SIMULATION/GET_SIMULATION/COMPLETE'
};


export function getSimulationSagaAction(location: any) {
  return { type: GET_SIMULATION.SAGA, payload: location };
}

export type SimulationResultReducerState = {
  booking_distance_bins: any,
  most_popular_dropoff_points: any,
  most_popular_pickup_points: any
};

export const initialState: SimulationResultReducerState = {
  booking_distance_bins: {},
  most_popular_dropoff_points: {},
  most_popular_pickup_points: {}
};

export function simulationResultReducer(state: SimulationResultReducerState = initialState, action: any) {
  switch (action.type) {
    case GET_SIMULATION.SAGA: {
      return { ...state,   booking_distance_bins: null,
        most_popular_dropoff_points: null,
        most_popular_pickup_points: null, isLoading: true };
    }
    case GET_SIMULATION.SUCCESS: {
      return { ...state,   booking_distance_bins: action.payload.booking_distance_bins,
        most_popular_dropoff_points: action.payload.most_popular_dropoff_points,
        most_popular_pickup_points:  action.payload.most_popular_pickup_points };
    }
    case GET_SIMULATION.COMPLETE: {
      return { ...state, isLoading: false };
    }
    default: {
      return state;
    }
  }
}

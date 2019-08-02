// @flow
import type { AppNotification } from '../types/payloads/app-notification';

// +++++++++++++++++++++++++++++  ACTION  +++++++++++++++++++++++++++++
export const APP_INIT_START = 'APP/APP_INIT_START';
export const APP_INIT_COMPLETE = 'APP/APP_INIT_COMPLETE';
export const APP_INIT_ERROR = 'APP/APP_INIT_ERROR';
export const APP_CLEAR_APP_NOTIFICATION = 'APP/CLEAR_APP_NOTIFICATION';
export const APP_SHOW_APP_NOTIFICATION = 'APP/SHOW_APP_NOTIFICATION';
// ----------------------- END ACTION CONSTANTS -----------------------------

// +++++++++++++++++++++++++++++  ACTION CREATOR TYPES +++++++++++++++++++++++++++++
export type AppInitStartAction = {|
  +type: 'APP/APP_INIT_START'
|};

export type AppInitCompleteAction = {|
  +type: 'APP/APP_INIT_COMPLETE'
|};

export type AppInitErrorAction = {|
  +type: 'APP/APP_INIT_ERROR',
  +payload: { error: string }
|};

export type ShowAppNotificationAction = {|
  +type: 'APP/SHOW_APP_NOTIFICATION',
  +payload: AppNotification
|};

export type ClearAppNotificationAction = {|
  +type: 'APP/CLEAR_APP_NOTIFICATION'
|};

export type AppActions =
  | AppInitStartAction
  | AppInitCompleteAction
  | AppInitErrorAction
  | ClearAppNotificationAction
  | ShowAppNotificationAction;

// --------------------- END ACTION CREATOR TYPES -----------------------------

// +++++++++++++++++++++++++++++ ACTIONS ++++++++++++++++++++++++++++++++++++++++
export function appInitStart(): AppInitStartAction {
  return { type: APP_INIT_START };
}

export function clearAppNotification(): ClearAppNotificationAction {
  return { type: APP_CLEAR_APP_NOTIFICATION };
}

export function showAppNotification(notification: AppNotification): ShowAppNotificationAction {
  return { type: APP_SHOW_APP_NOTIFICATION, payload: notification };
}

// ----------------------------- END ACTIONS ------------------------------------

// -------------------------------- REDUCER STATE ------------------------------------
type AppState = {
  +initialized: boolean,
  +appNotification: ?AppNotification,
  +appError: ?string
};

export const initialState: AppState = {
  initialized: false,
  appNotification: null,
  appError: null
};

// ------------------------------ END REDUCER STATE ------------------------------------

// Reducer
export function appReducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case APP_INIT_COMPLETE: {
      return {
        ...state,
        initialized: true
      };
    }
    case APP_INIT_ERROR: {
      return {
        ...state,
        appError: action.payload.error
      };
    }
    case APP_SHOW_APP_NOTIFICATION: {
      const appNotification = action.payload;
      return { ...state, appNotification };
    }
    case APP_CLEAR_APP_NOTIFICATION: {
      return { ...state, appNotification: null };
    }
    default: {
      return state;
    }
  }
}

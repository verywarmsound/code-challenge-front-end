type PayloadType = string | number | boolean | {};

export type Action<T: string> = {|
  +type: T
|};

export type ActionWithPayload<T: string, P: PayloadType> = {|
  +type: T,
  payload: P
|};

export type ActionWithError<T: string, P: {}> = {|
  +type: T,
  payload: P,
  error: true
|};

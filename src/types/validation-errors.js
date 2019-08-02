export type APIError = {
  code: string
};

export type APIErrors = {
  [key: string]: APIError
};

export type ErrorMapperOptions = {
  ignoredPrefixes?: Array<string>,
  errorKeyMap?: {
    [key: string]: string
  }
};

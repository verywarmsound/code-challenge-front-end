// @flow

import { config } from './config';

// eslint-disable-next-line no-unused-vars
function appBasePath() {
  // eslint-disable-next-line no-underscore-dangle
  return config.APP_BASE_PATH || '/';
}

// eslint-disable-next-line no-unused-vars
function appFullPath() {
  // eslint-disable-next-line no-underscore-dangle
  return config.APP_FULL_PATH || '//';
}

function absolutePath(path: string) {
  return `${appBasePath()}${path}`;
}

export function homeAbsolutePath() {
  return absolutePath('/');
}


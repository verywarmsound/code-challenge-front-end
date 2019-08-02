import { ci } from './ci';
import { staging } from './staging';
import { production } from './production';
// require dynamically and optionally as we do not have development.js in Git
let development = {};
try {
  development = require('./development').development;
  // eslint-disable-next-line no-empty
} catch (e) {}

const configs = { ci, staging, production, development };

// eslint-disable-next-line no-underscore-dangle
export const appEnv = (window.__env && window.__env.APP_ENV) || 'development';

function getEffectiveConfig() {
  return configs[appEnv];
}

export const config = getEffectiveConfig();

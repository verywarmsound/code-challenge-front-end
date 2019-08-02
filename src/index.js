// @flow
/* eslint-disable import/first,import/order */

import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';


import { HotApp } from './app';

// eslint-disable-next-line no-underscore-dangle
window.__env = window.__env || {};

ReactDOM.render(<HotApp />, window.document.getElementById('root'));

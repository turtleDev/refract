'use strict';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './app/main.jsx';

ReactDOM.render(
    React.createElement(Main),
    document.getElementById('app')
);

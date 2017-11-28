'use strict';

import 'babel-polyfill';
import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './app/main.jsx';

ReactDOM.render(
    React.createElement(Main),
    document.getElementById('app')
);

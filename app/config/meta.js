'use strict';

const Confidence = require('confidence');
const Pkg = require('../package.json');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV 
    }
};

//  Confidence document object

internals.config = {
    $meta: 'App metadata configuration file',
    title: Pkg.name,
    keywords: ['slack', 'jukebox', 'refract']
    
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};

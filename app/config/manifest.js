'use strict';

const Confidence = require('confidence');
const Config = require('./config');
const Meta = require('./meta');


let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
    server: {
        connections: {
            router: {
                stripTrailingSlash: true,
                isCaseSensitive: false
            },
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }],
    registrations: [

        // Static file and directory handlers
        {
            plugin: 'inert'
        },

        // Templates rendering support 
        {
            plugin: 'vision'
        },

        // Views loader 
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: {
                        hbs: 'handlebars'
                    },
                    path: './app/templates',
                    layoutPath: './app/templates/layouts',
                    helpersPath: './app/templates/helpers',
                    partialsPath: './app/templates/partials',
                    layout: 'default'
                }
            }
        },

        // context injection
        {
            plugin: {
                register: './lib/context.js',
                options: {
                    meta: Meta.get('/')
                }
            }
        },

        // database connector
        {
            plugin: {
                register: './lib/sequelize.js',
                options: Config.get('/sequelize')
            }
        },

        //  Core routes
        {
            plugin: './app/routes/core.js'
        },

        //  Pages routes
        {
            plugin: './app/routes/pages.js'
        },

        {
            plugin: './app/routes/ajax.js'
        }
    ]
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};
exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};

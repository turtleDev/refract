'use strict';

const Confidence = require('confidence');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};


//  Confidence document object

internals.config = {
    $meta: 'App configuration file',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    sequelize: {
        database: 'refract',
        username: null,
        password: null,
        config: {
            dialect: 'sqlite',
            storage: process.env.REFRACT_DB_PATH,
            logging: function noop() {}
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://example.com',
        $default: 'http://127.0.0.1:8000'
    },
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};

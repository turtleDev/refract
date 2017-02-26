'use strict';

exports.register = function(server, options, next) {

    const Controllers = {
        ajax: {
            url: require('../controllers/ajax/url')
        }
    };

    server.route([
    
    {
        method: 'GET',
        path: '/v0/videos',
        config: Controllers.ajax.url.index
    }

    ]);

    return next();
};

exports.register.attributes = {
    name: 'ajax routes',
    version: require('../../package.json').version
};


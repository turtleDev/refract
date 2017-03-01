'use strict';

exports.register = function(server, options, next) {

    const Controllers = {
        ajax: {
            app: require('../controllers/ajax/app')
        }
    };

    server.route([

    {
        method: 'GET',
        path: '/v0/teams',
        config: Controllers.ajax.app.teams
    },
    {
        method: 'GET',
        path: '/v0/videos',
        config: Controllers.ajax.app.videos
    }

    ]);

    return next();
};

exports.register.attributes = {
    name: 'ajax routes',
    version: require('../../package.json').version
};


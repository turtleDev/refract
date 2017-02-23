'use strict';

exports.view = {
    description: 'Returns the home page',
    handler: function(request, reply) {

        reply.view('homepage');

    }
};

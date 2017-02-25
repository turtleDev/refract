'use strict';

const Boom = require('boom');

exports.index = {
    description: 'serve a list of urls',
    handler: function(request, reply) {

        const db = request.server.db;

        db.Videos.findAll()
        .then((videos) => {
            
            videos = videos.map((video) => {

                return video.get({plain: true});
            });

            const payload = { videos };

            return reply(payload);
        })
        .catch((err) => {
            console.error(err);
            return reply(Boom.internal(err)).code(500);
        });
    }
};

'use strict';

const Boom = require('boom');

exports.videos = {
    description: 'fetches all videos, optionally filtered by team_id',
    handler: function(request, reply) {

        const team_id = request.query.team_id;
        const query = {};
        if ( team_id) {
            query.team_id = team_id;
        }

        const db = request.server.db;

        db.Videos.findAll(query)
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

exports.teams = {
    description: 'return team list',
    handler: function(request, reply) {
        
        const db = request.server.db;

        db.Teams.findAll()
        .then((teams) => {
            
            teams = teams.map((video) => {

                return video.get({plain: true});
            });

            const payload = { teams };

            return reply(payload);
        })
        .catch((err) => {
            console.error(err);
            return reply(Boom.internal(err)).code(500);
        });

    }
};

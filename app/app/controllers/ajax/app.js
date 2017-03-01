'use strict';

const Boom = require('boom');

exports.videos = {
    description: 'fetches all videos, optionally filtered by team_id',
    handler: function(request, reply) {

        const db = request.server.db;

        const team_id = request.query.team_id;

        if ( team_id ) {

            /* find a way to do this without executing raw queries */
            const query = 'select video_id, duration, title from teams join videos on teams.id == videos.team_id where teams.team_id=?';

            db._sequelize.query(query, { 
                replacements: [team_id], 
                types: db._sequelize.QueryTypes.SELECT
            })
            .then((videos) => {

                videos = videos[0];
                const payload = { videos };
                return reply(payload);
            })
            .catch((err) => {
                console.error(err);
                return reply(Boom.internal(err)).code(500);
            });

        } else {

            const query = {
                attributes: ['video_id', 'duration', 'title']
            };
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
    }
};

exports.teams = {
    description: 'return team list',
    handler: function(request, reply) {
        
        const db = request.server.db;

        const domain = request.query.domain;
        const query = {};
        if ( domain) {
            query.where = { domain };
        }

        db.Teams.findAll(query)
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

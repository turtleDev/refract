'use strict';

const Boom = require('boom');

exports.videos = {
    description: 'fetches all videos, optionally filtered by team_id',
    handler: function(request, reply) {

        const db = request.server.db;

        const id = request.query.id;

        if ( id ) {

            /* find a way to do this without executing raw queries */
            const query = 'select videos.video_id, videos.duration, videos.title ' +
                          'from videos join map on map.video_id == videos.id '+
                          'where map.team_id=? and title is not null';

            db._sequelize.query(query, { 
                replacements: [id], 
                types: db._sequelize.QueryTypes.SELECT
            })
            .then((videos) => {

                videos = videos[0];
                const payload = { videos };
                return reply(payload);
            })
            .catch((err) => {

                console.error(err);
                return reply(Boom.internal(err));
            });

        } else {

            const query = {
                attributes: ['video_id', 'duration', 'title']
            };
            db.Videos.findAll(query)
            .then((videos) => {
                
                videos = videos.map((video) => {

                    return video.get({plain: true});
                }).filter(

                    (video) => !!video.title
                );

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
        /**
         * team_id corresponds to the ID used by slack archive, but
         * we'll use the ids populated by our database engine
         */
        const query = {
            attributes: ['id', 'domain', 'name']
        };
        if ( domain ) {
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

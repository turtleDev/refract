'use strict';

exports.index = {
    description: 'serve a list of urls',
    handler: function(request, reply) {

        const db = request.server.db;

        db.Url.findAll()
        .then((urls) => {
            
            urls = urls.map((url) => {

                return url.get({plain: true}).url;
            });

            const payload = { videos: urls };

            return reply(payload);
        });
    }
};

'use strict';

const Composer = require('./index');
const Hoek = require('hoek');

Composer(function(err, server) {

    Hoek.assert(!err, err);
    server.start(function() {
        console.log('[server] Server started @ ' + server.info.uri);
    });
    
});

'use strict';

const Sequelize = require('sequelize');
const Glob = require('glob');
const Path = require('path');

exports.register = function(server, options, next) {

    if ( !options.config.storage ) {
        throw new Error('can\'t find the database path. Did you setup the environment correctly?');
    }

    const db = {};

    const sequelize = new Sequelize(
        options.database,
        options.username, 
        options.password, 
        options.config
    );

    Glob.sync('app/models/*.js').forEach((file) => {
        const model = sequelize.import(Path.join('..', file));
        db[model.name] = model;
    });

    Object.keys(db).forEach(function(modelName) {
      if ( 'associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });

    sequelize.sync().then(() => {
        console.log('database connected');
    });

    db._sequelize = sequelize;

    server.decorate('server', 'db', db);
    
    return next();
};

exports.register.attributes = {
    name: 'database plugin',
    version: require('../package.json').version
};

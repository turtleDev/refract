'use strict';

module.exports = function(sequelize, DataTypes) {

    const schema = {
        team_id: DataTypes.BIGINT,
        video_id: DataTypes.BIGINT
    };

    const options = {
        tableName: 'map',
        timestamps: false
    };

    return sequelize.define('Map', schema, options);
};

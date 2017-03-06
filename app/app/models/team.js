'use strict';

module.exports = function(sequelize, DataTypes) {

    const schema = {
        name: DataTypes.STRING,
        domain: DataTypes.STRING,
        team_id: DataTypes.STRING
    };

    const options = {
        tableName: 'teams',
        timestamps: false,
    };

    return sequelize.define('Teams', schema, options);
};

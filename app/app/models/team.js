'use strict';

module.exports = function(sequenlize, DataTypes) {

    const schema = {
        name: DataTypes.STRING,
        domain: DataTypes.STRING,
        team_id: DataTypes.STRING
    };

    const options = {
        tableName: 'teams',
        timestamps: false,
    };

    return sequenlize.define('Teams', schema, options);
};

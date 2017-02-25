'use strict';

module.exports = function(sequelize, DataTypes) {

    const schema = {
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        duration: DataTypes.STRING
    };

    const options = {
        tableName: 'videos',
        timestamps: false,
    };

    return sequelize.define('Videos', schema, options);
};


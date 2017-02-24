'use strict';

module.exports = function(sequelize, DataTypes) {

    const schema = {
        url: DataTypes.STRING
    };

    const options = {
        tableName: 'urls',
        timestamps: false,
    };

    return sequelize.define('Url', schema, options);
};


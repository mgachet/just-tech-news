const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model { }

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            allowNull:false,
            references: {
                model: 'post',
                key: 'id'
            },
            type: DataTypes.INTEGER,
        },
        user_id: {
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            },
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    });

module.exports = Vote;
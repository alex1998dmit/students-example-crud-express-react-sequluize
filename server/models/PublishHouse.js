const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PublishHouse extends Model {}
    PublishHouse.init({
        publish: DataTypes.STRING,
        city: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PublishHouse',
    })
    PublishHouse.associate = (models) => {
        PublishHouse.hasMany(models.Book);
    }
    return PublishHouse;
}
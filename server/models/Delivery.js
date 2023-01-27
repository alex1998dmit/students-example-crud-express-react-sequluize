const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Delivery extends Model {}
    Delivery.init({
        company: DataTypes.STRING,
        delivery: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        INN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Delivery',
    })
    Delivery.associate = (models) => {
        Delivery.hasMany(models.Purchase);
    }
    return Delivery;
}

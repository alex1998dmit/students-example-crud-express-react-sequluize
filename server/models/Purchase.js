const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Purchase extends Model {}
    Purchase.init({
        order_date: DataTypes.DATE,
        type: DataTypes.STRING,
        cost: DataTypes.FLOAT,
        amount: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Purchase',
    })
    Purchase.associate = (models) => {
        Purchase.belongsTo(models.Book);
        Purchase.belongsTo(models.Delivery);
    }
    return Purchase;
}
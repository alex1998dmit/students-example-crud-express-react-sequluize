const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {}
    Book.init({
        title_book: DataTypes.STRING,
        pages: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Book',
    })
    Book.associate = (models) => {
        Book.belongsTo(models.Author);
        Book.belongsTo(models.PublishHouse);
        Book.hasMany(models.Purchase);
    }
    return Book;
}

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Author extends Model {}
    Author.init({
        name_author: DataTypes.STRING,
        birthday: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Author',
    })
    Author.associate = (models) => {
        Author.hasMany(models.Book);
    }
    return Author;
}

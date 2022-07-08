module.exports = function Product(DataTypes, Model, sequelize) {

    class Article extends Model {
    }

    Article.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
        }
    );

    return Article;
}



module.exports = function Command(DataTypes, Model, sequelize) {

    class Command extends Model {
    }

    Command.init(
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

    return Command;
}


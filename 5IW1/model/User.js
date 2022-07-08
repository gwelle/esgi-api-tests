module.exports = function User(DataTypes, Model, sequelize) {

    class User extends Model {}

    User.init(
        {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                lastname: DataTypes.STRING,
                role: DataTypes.STRING,
                validate: {
                    isEmail: true,
                },
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            roles: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            }
        },
        {
            sequelize,
        }
    );

    User.prototype.generatePasswordResetToken = async function () {
        jwt.sign({id: this.id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) return err;
            this.resetToken = token;
            this.save();
        });
    }
    User.addHook('beforeSave', async (user) => {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.JWT_SECRET, 40));
    })

    return User;
};

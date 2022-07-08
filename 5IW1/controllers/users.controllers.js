const {UserService} = require('../service/users.service');

module.exports = function UserController(User) {
    return {

        create: async (data) => {
            if (await User.findOne({
                where: {
                    email: data.email
                },
                raw: true
            })) {
                throw 'Email "' + data.email + '" is already registered';
            } else {
                return await User.create(data);
            }
        },
        findOne: async (field, value) => {
            return await User.findOne({where: {[`${field}`]: value}});
        },
        delete: async (id) => {
            return await User.destroy({where: {id}});
        },
        update: async (id, data) => {
            let req = await User.update(data, {where: {id}})
            if (req > 0) {
                return await User.findOne({
                    where: {
                        [Op.or]: {id: id}
                    }
                });
            } else {
                return 0
            }
        },

        login : async (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const user = await UserService.find({"email": email});
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            if (UserService.comparePassword(password, user.password)) {
                const token = UserService.generateToken(user);
                return res.status(200).json({
                    status: 'success',
                    message: 'Login successful',
                    token: token
                });
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid password'
                });
            }
        },

        register : async (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const confirm_password = req.body.confirmPassword;
            const user = await UserService.find({"email": email});
            if (user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists'
                });
            }
            if (password !== confirm_password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password and confirm password does not match'
                });
            }
            const newUser = {
                email: email,
                password: password,
                isActive: false,
                role: 'user'
            }
            await UserService.create(newUser).then(() => {
                res.status(200).json({
                    status: 'success',
                    message: 'User created successfully'
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: 'User creation failed'
                });
            })

        } ,

        getUsers :  async (req, res) => {
            await UserService.findAll().then((users) => {
                res.status(200).json({
                    status: 'success',
                    users: users
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: 'User fetch failed'
                });
            })
        },
        getUserById : async (req, res) => {
            const user_id = req.params.user_id;
            await UserService.find({"id":user_id}).then((user) => {
                res.status(200).json({
                    status: 'success',
                    user: user
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: 'User fetch failed'
                });
            })
        },
        updateUser : async (req, res) => {
            const user = req.body;
            const user_id = req.params.user_id;

            await UserService.update(user_id, user).then(() => {
                res.status(200).json({
                    status: 'success',
                    message: 'User updated successfully'
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: 'User update failed'
                });
            })
        },
        deleteUser : async (req, res) => {
            const user_id = req.params.user_id;
            await UserService.delete(user_id).then(() => {
                res.status(200).json({
                    status: 'success',
                    message: 'User deleted successfully'
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: 'User delete failed'
                });
            })
        }
    }
}

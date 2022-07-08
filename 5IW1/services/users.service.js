const User = require('../models/User');
const Op = require("sequelize");

const jwt = require('jsonwebtoken');

module.exports = {
    findAll: async (args = null) => {
        return User.findAll();
    },
    find: async (...args) => {
        const user = await User.findOne({
            where: {
                [Op.or]: args
            }
        });
        if (user !== null) {
            return user;
        } else {
            throw new Error('User not found');
        }
    },
    findAllByParams: async (...args) => {
        const users = await User.findAll({
            where: {
                [Op.or]: args
            },
            raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }]
        });
        if (users !== null) {
            return users;
        } else {
            throw new Error('Users not found');
        }
    },
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
    comparePassword: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }   ,
    generateToken: (user) => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    }
}

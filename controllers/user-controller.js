const Users = require('../database/Users');
const {errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await Users.find().select('-password');

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserByID: (req, res, next) => {
        try {

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {

            await Users.createHashPassword(req.body);

            res.status(errors_code.UPDATE_DATA).json('You create new user!');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.user;

            await Users.findByIdAndDelete(id);

            res.json(errors_code.REMOVE).json('User was removed!');

        } catch (e) {
            next(e);
        }
    },
}
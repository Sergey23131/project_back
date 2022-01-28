const O_Auth = require('../database/O_Auth');
const Users = require('../database/Users');

const {errors_code, errors_massage} = require('../errors');
const jwtService = require("../services/token.service");
const emailService = require("../services");
const {FORGOT_PASSWORD, UPDATE, LOGIN} = require("../configs/email.actions");

module.exports = {
    logUser: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            const oneUser = await Users.findById(req.user.id).select('-password');

             await emailService.sendMail(req.user.email, LOGIN, {userName: req.user.name});

            res.json({
                user: oneUser,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            await O_Auth.findOneAndDelete(req.token);

            res.json('You made logOut!');
        } catch (e) {
            next(e);
        }

    },

    updateUser: async (req, res, next) => {
        try {

            const id = req.user.id;

            await Users.findByIdAndUpdate(id, req.body);

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: id
            });

            const oneUser = await Users.findById(id).select('-password');

            await emailService.sendMail(oneUser.email, UPDATE, {userName: oneUser.name});

            res.json({
                user: oneUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }

    },

    refreshToken: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            res.json({
                user: req.user,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            await emailService.sendMail(email, FORGOT_PASSWORD, {forgotPasswordUrl: `http://loclalhost:5000/auth/password/forgot/set?token=${req.token}`});

            res.status(errors_code.UPDATE_DATA).json('Token');
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(errors_massage.UPDATE_DATA);
        } catch (e) {
            next(e);
        }
    },
};

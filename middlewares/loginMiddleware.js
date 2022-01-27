const O_Auth = require('../database/O_Auth');
const Users = require('../database/Users');

const loginValidator = require('../validators/login.validator');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');
const passwordService = require('../services/password.service');

module.exports = {
    loginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const loginInfo = await Users.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

           const {password}= req.body;
            const hashPassword = loginInfo.password;

            await passwordService.compare(password, hashPassword);

            req.user = loginInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    isloginBodyValid: (req, res, next) => {
        try {
            const {error, value} = loginValidator.userLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    /*    sendMailForgotPassword: async (req, res, next) => {
            try {
                const {email} = req.body;

                const {error, value} = emailValidator.userEmailValidator.validate(req.body);

                if (error) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
                }

                const user = await User.findOne({email});

                if (!user) {
                    throw ErrorHandler(errors_massage.FORGOT_PASSWORD, errors_code.NOT_FOUND);
                }

                const actionToken = jwtService.generateActionToken(FORGOT_PASSWORD);

                await ActionToken.create({
                    token: actionToken,
                    token_type: FORGOT_PASSWORD,
                    user_id: user._id
                });

                req.token = actionToken;

                next();
            } catch (e) {
                next(e);
            }
        },

        checkAccessToken: async (req, res, next) => {
            try {
                const token = req.get(AUTHORIZATION);

                if (!token) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
                }

                await jwtService.verifyToken(token);

                const tokenResponse = await O_Auth
                    .findOne({access_token: token})
                    .populate('user_id');

                if (!tokenResponse) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
                }

                req.user = tokenResponse.user_id;
                req.token = token;

                next();
            } catch (e) {
                next(e);
            }
        },

        checkRefreshToken: async (req, res, next) => {
            try {
                const token = req.get(AUTHORIZATION);

                if (!token) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
                }

                await jwtService.verifyToken(token, tokenType.REFRESH);

                const tokenResponse = await O_Auth
                    .findOne({refresh_token: token});

                if (!tokenResponse) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
                }

                await O_Auth.findOneAndDelete({refresh_token: token});

                req.token = token;
                req.user = tokenResponse.user_id;

                next();
            } catch (e) {
                next(e);
            }
        },

        setNewPasswordMiddleware: async (req, res, next) => {
            try {
                const {password} = req.body;

                const {error, value} = passwordValidator.userEmailValidator.validate(req.body);

                if (error) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
                }
                const actionToken = req.get(AUTHORIZATION);

                if (!actionToken) {
                    throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
                }

                await jwtService.verifyToken(actionToken, FORGOT_PASSWORD);

                const user = await ActionToken.findOne({token: actionToken});

                await ActionToken.findOneAndDelete(actionToken);

                await User.updateHashPassword(user, password);

                await O_Auth.deleteMany({user_id: user.id});

                next();
            } catch (e) {
                next(e);
            }
        },*/
};

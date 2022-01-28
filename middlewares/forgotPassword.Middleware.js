const passwordValidator = require("../validators/email.validator");
const emailValidator = require("../validators/email.validator");

const Users = require('../database/Users');
const O_Auth = require('../database/O_Auth');
const ActionToken = require('../database/ActionToken')

const {ErrorHandler, errors_massage, errors_code} = require("../errors");
const jwtService = require("../services");

const {AUTHORIZATION} = require("../configs/constants");
const {FORGOT} = require("../configs/token.type");


module.exports = {
    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const {error, value} = emailValidator.userEmailValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const user = await Users.findOne({email});

            if (!user) {
                throw ErrorHandler(errors_massage.FORGOT_PASSWORD, errors_code.NOT_FOUND);
            }

            const actionToken = jwtService.generateActionToken(FORGOT);

            await ActionToken.create({
                token: actionToken,
                token_type: FORGOT,
                user_id: user._id
            });

            req.token = actionToken;

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

            await jwtService.verifyToken(actionToken, FORGOT);

            const user = await ActionToken.findOne({token: actionToken});

            await ActionToken.findOneAndDelete(actionToken);

            await Users.updateHashPassword(user, password);

            await O_Auth.deleteMany({user_id: user.id});

            next();
        } catch (e) {
            next(e);
        }
    },
}
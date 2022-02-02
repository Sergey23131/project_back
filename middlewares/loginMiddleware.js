const Users = require('../database/Users');

const loginValidator = require('../validators/login.validator');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');
const {passwordService} = require('../services');

module.exports = {
    loginMiddleware: async (req, res, next) => {
        try {

            const {email} = req.body;

            const loginInfo = await Users.findOne({email});

            if (!loginInfo) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            const {password} = req.body;
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
    }
};

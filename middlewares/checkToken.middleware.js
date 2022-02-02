const O_Auth = require('../database/O_Auth');
const tokenType = require("../configs/token.type");

const {ErrorHandler, errors_massage, errors_code} = require("../errors");
const {AUTHORIZATION} = require("../configs/constants");
const {jwtService} = require("../services");


module.exports = {
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
            req.tokenID = tokenResponse;

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
    }
}
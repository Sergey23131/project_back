const {ErrorHandler, errors_massage, errors_code} = require("../errors");
const updateValidator = require('../validators/updateUser.validator');

module.exports= {
    userUpdate: (req, res, next) => {
        try {

            const {error, value} = updateValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}
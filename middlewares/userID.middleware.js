const Users = require('../database/Users');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    checkUserID: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await Users.findById(user_id).select('-password');

            if (!oneUser) {
                throw new ErrorHandler(errors_massage.NOT_FOUND_BY_ID, errors_code.NOT_FOUND);
            }

            req.user = oneUser;

            next();
        } catch (e) {
            next(e);
        }
    }
};
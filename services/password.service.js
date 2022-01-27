const bcrypt = require('bcrypt');
const {ErrorHandler, errors_code, errors_massage} = require('../errors');

module.exports = {
    hash: (password) => {
        bcrypt.hash(password, 10);
    },

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(errors_massage.NOT_VALID_BODY, errors_code.NOT_VALID);
        }
    }
};
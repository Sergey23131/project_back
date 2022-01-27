const Joi = require('joi');

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    phoneNumber: Joi
        .number()
        .required(),
});

module.exports = {
    updateUserValidator
};

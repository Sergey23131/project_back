const Joi = require('joi');

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    phoneNumber: Joi.string()
        .alphanum()
        .min(10)
        .max(16)
        .trim()
        .required()
});

module.exports = {
    updateUserValidator
};

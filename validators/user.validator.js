const Joi = require('joi');

const userRoles = require('../configs/user_roles');
const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');

const userValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    nickName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    age: Joi
        .number()
        .required(),
    phoneNumber: Joi
        .number()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    userValidator
};

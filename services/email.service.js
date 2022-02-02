const path = require("path");
const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const allTemplates = require('../emailTemplates');

const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../configs/config');
const {ErrorHandler, errors_massage, errors_code} = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'emailTemplates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {


    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errors_massage.INVALID_ACTION, errors_code.ACTION);
    }
    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'Name',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
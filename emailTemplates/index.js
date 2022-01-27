const emailActions = require('../configs/email.actions');

module.exports = {
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Update name'
    },
    [emailActions.LOGIN]: {
        templateName: 'login',
        subject: 'You in our system'
    },
    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'We will help you!'
    }

};

const authController = require('../controllers/auth-controller');
const authRouter = require('express').Router();

const loginMiddleware = require('../middlewares/loginMiddleware');

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.loginMiddleware, authController.logUser);

authRouter.put('/update', authController.updateUser);

authRouter.delete('/logout', authController.logOut);

authRouter.post('/refresh', authController.refreshToken);


//authRouter.post('/password/forgot', loginMiddleware.sendMailForgotPassword, authController.sendMailForgotPassword);
//authRouter.post('/password/forgot/set', loginMiddleware.setNewPasswordMiddleware, authController.setNewPassword);
module.exports = authRouter;
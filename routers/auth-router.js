const authController = require('../controllers/auth-controller');
const authRouter = require('express').Router();

const loginMiddleware = require('../middlewares/loginMiddleware');
const updateMiddleware = require('../middlewares/updateUser.middleware')
const tokenMiddleware = require('../middlewares/checkToken.middleware')

authRouter.post('/', loginMiddleware.isloginBodyValid, loginMiddleware.loginMiddleware, authController.logUser);

authRouter.put('/update', updateMiddleware.userUpdate, tokenMiddleware.checkAccessToken, authController.updateUser);

authRouter.delete('/logout', tokenMiddleware.checkAccessToken, authController.logOut);

authRouter.post('/refresh', tokenMiddleware.checkRefreshToken, authController.refreshToken);

//authRouter.post('/password/forgot', loginMiddleware.sendMailForgotPassword, authController.sendMailForgotPassword);
//authRouter.post('/password/forgot/set', loginMiddleware.setNewPasswordMiddleware, authController.setNewPassword);

module.exports = authRouter;
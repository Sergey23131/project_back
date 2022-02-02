const userController = require('../controllers/user-controller');
const userRouter = require('express').Router();

const idMiddleware = require('../middlewares/userID.middleware');
const createMiddleware = require('../middlewares/createUserMiddleware');

userRouter.get('/', userController.getUsers);

userRouter.post('/', createMiddleware.createUserMiddleware, userController.createUser);

userRouter.delete('/:user_id', idMiddleware.checkUserID, userController.deleteUser);

userRouter.get('/:user_id', idMiddleware.checkUserID, userController.getUserByID);

module.exports = userRouter;
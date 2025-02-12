import express from 'express';
const UserRouter = express.Router();
import auth from '../middlewares/validateUser';
import User from '../controllers/user';
import validate from '../middlewares/validators/authValidator';
import getUser from '../middlewares/getUser';
import adminAuth from '../middlewares/validateAdmin';
const user = new User();

UserRouter.get('/', auth, adminAuth, user.getUsers);
UserRouter.get('/:id', getUser, user.getUser);
UserRouter.post('/', validate.signUp, user.createUser);
UserRouter.post('/:id/:artisanId/add', auth, getUser, user.addToFavorite);
UserRouter.post(
    '/:id/:artisanId/remove',
    auth,
    getUser,
    user.removeFromFavorite
);
UserRouter.post('/login', validate.signIn, user.login);
UserRouter.delete('/:id', auth, adminAuth, getUser, user.deleteUser);
UserRouter.patch('/:id', auth, getUser, user.patchUser);

export default UserRouter;

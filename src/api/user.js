import express from 'express';
const UserRouter = express.Router();
import auth from '../middlewares/validateUser';
import User from '../controllers/user';
import getUser from '../middlewares/getUser';
import adminAuth from '../middlewares/validateAdmin';
const user = new User();

UserRouter.get('/', auth, adminAuth, user.getUsers);
UserRouter.get('/:id', getUser, user.getUser);
UserRouter.post('/', user.createUser);
UserRouter.post('/login', user.login);
UserRouter.delete('/:id', auth, adminAuth, getUser, user.deleteUser);
UserRouter.patch('/:id', auth, getUser, user.patchUser);

export default UserRouter;

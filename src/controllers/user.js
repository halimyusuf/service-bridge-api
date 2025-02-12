import _ from 'lodash';
import asyncHandler from '../utils/asyncWrapper';
import User from '../models/user';
import validatorErr from '../utils/validatorErr';
import { hash, decrypt } from '../utils/hash';

export default class UserController {
    login = asyncHandler(async (req, res) => {
        const err = validatorErr(req, res);
        if (err !== null) return;
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // const errObj = {}
        if (user === null) {
            return res
                .status(400)
                .json({ error: 'Account with the email exist does not exist' });
        }
        const match = await decrypt(password, user.password);
        if (!match) {
            return res.status(400).send({ error: 'Incorrect password' });
        }
        const token = user.generateAuthToken();
        res.header('auth-x-token', token).send({
            token,
        });
    });

    addToFavorite = asyncHandler(async (req, res) => {
        let favorites = res.user.favorites;
        res.user.favorites = [...new Set(favorites).add(req.params.artisanId)];
        favorites = await res.user.save();
        res.json(favorites);
    });

    removeFromFavorite = asyncHandler(async (req, res) => {
        let favorites = res.user.favorites;
        favorites = favorites.filter((item) => item != req.params.artisanId);
        res.user.favorites = [...favorites];
        favorites = await res.user.save();
        res.json(favorites);
    });

    async getUsers(req, res) {
        const users = await User.find({});
        res.status(200).json(users);
    }

    async getUser(req, res) {
        res.status(200).json(res.user);
    }

    createUser = asyncHandler(async (req, res) => {
        const err = validatorErr(req, res);
        if (err !== null) return;
        req.body = _.pick(req.body, 'name', 'email', 'password', 'phone');
        req.body.password = await hash(req.body.password);
        let user = await User.findOne({ email: req.body.email });
        if (user !== null) {
            return res
                .status(400)
                .json({ error: 'An account with this email already exists' });
        }
        user = new User(req.body);
        const newUser = await user.save();
        const token = newUser.generateAuthToken();
        res.header('auth-x-token', token).status(200).json({ token });
    });

    patchUser = asyncHandler(async (req, res) => {
        if (req.user.id != res.user._id && req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        const fields = ['name', 'phone', 'address', 'imgUrl'];
        let updatedRecord = _.pick(req.body, ...fields);
        for (let field of Object.keys(updatedRecord)) {
            res.user[field] = updatedRecord[field];
        }
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    });

    deleteUser = asyncHandler(async (req, res) => {
        if (!req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.user.remove();
        res.json({ message: 'Deleted user' });
    });
}

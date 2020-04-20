import User from '../models/user';

export default async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.user = user;
    } catch (error) {
        next(error);
    }
    next();
};

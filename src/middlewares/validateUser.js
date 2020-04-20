import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
    const token = req.headers['auth-x-token'];
    try {
        const decoded = jwt.verify(token, config.JwtKey);
        // console.log(decoded);

        let user = User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ error: 'invalid token' });
        }
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

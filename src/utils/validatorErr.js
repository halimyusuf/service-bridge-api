import { validationResult } from 'express-validator';

export default (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    return null;
};

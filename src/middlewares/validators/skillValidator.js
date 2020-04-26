import { check } from 'express-validator';

export default [
    check('name')
        .trim()
        .isLength({
            min: 2,
        })
        .withMessage('must be at least two characters'),
];

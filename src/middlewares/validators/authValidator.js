import { check } from 'express-validator';

export default () => {
    return [
        check('email').isEmail().withMessage('Enter a valid email'),

        check('password')
            .trim()
            .isLength({
                min: 7,
            })
            .withMessage('must be at least 7 chars long')
            .matches(/\d/)
            .withMessage('must contain a number'),

        check('name')
            .trim()
            .isString()
            .isLength({
                min: 2,
            })
            .withMessage('must be at least 2 chars long'),

        check('phone')
            .trim()
            .isString()
            .isLength({
                min: 10,
            })
            .withMessage('must be at least 10 chars long')
            .matches(/\d{10,}/)
            .withMessage('can only be a number'),
    ];
};

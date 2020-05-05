import { check } from 'express-validator';

export default () => {
    return [
        check('message')
            .trim()
            .isLength({
                min: 1,
            })
            .withMessage('Must contain at least one char'),
        check('rating')
            .matches(/^[12345]{1}$/)
            .withMessage('Can only be a num from 1-5'),
    ];
};

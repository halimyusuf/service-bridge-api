import { check } from 'express-validator';

export default () => {
    return [
        check('experience')
            .trim()
            .isLength({
                min: 30,
            })
            .withMessage('must be at least 30 chars long'),
    ];
};

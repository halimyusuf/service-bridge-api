import Review from '../models/review';
import _ from 'lodash';
import validatorErr from '../utils/validatorErr';
import asyncHandler from '../utils/asyncWrapper';

export default class ReviewController {
    createReview = asyncHandler(async (req, res) => {
        const err = validatorErr(req, res);
        if (err !== null) return;
        req.body = _.pick(req.body, 'message', 'rating');
        req.body.rating = Number(req.body.rating);
        req.body.user = req.user._id;
        let newReview = new Review(req.body);
        newReview = await newReview.save();
        res.json(newReview);
    });

    getReviews = asyncHandler(async (req, res) => {
        const reviews = await Review.find();
        res.json(reviews);
    });

    getReview = asyncHandler(async (req, res) => {
        res.json(res.review);
    });

    patchReview = asyncHandler(async (req, res) => {
        if (req.user.id != res.review.user && req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        if (req.body.message) {
            res.review.message = req.body.message;
        }
        const review = await res.review.save();
        res.json(review);
    });

    deleteReview = asyncHandler(async (req, res) => {
        if (req.user.id != res.review.user._id && req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.review.remove();
        res.json({ success: 'Review deleted' });
    });
}

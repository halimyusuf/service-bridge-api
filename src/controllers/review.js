import Review from '../models/review';
import _ from 'lodash';
import asyncHandler from '../utils/asyncWrapper';

export default class ReviewController {
    createReview = asyncHandler(async (req, res) => {
        req.body = _.pick(req.body, 'message', 'ratings');
        let newReview = new Review(req.body);
        newReview = await newReview.save();
        res.json(newReview);
    });

    getReviews = asyncHandler(async (req, res) => {
        const reviews = Review.find();
        res.json(reviews);
    });

    getReview = asyncHandler(async (req, res) => {
        res.json(res.review);
    });

    patchReview = asyncHandler(async (req, res) => {
        if (req.user.id !== res.review.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
    });

    deleteReview = asyncHandler(async (req, res) => {
        if (req.user.id !== res.review.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.review.remove();
        res.json({ success: 'Review deleted' });
    });
}

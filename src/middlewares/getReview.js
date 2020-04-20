import Review from '../models/review';

export default async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.review = review;
    } catch (error) {
        next(error);
    }
    next();
};

import express from 'express';
import auth from '../middlewares/validateUser';
import Review from '../controllers/review';
import getReview from '../middlewares/getReview';
const ReviewRouter = express.Router();
const review = new Review();

ReviewRouter.get('/', review.getReviews);
ReviewRouter.get('/:id', getReview, review.getReview);
ReviewRouter.post('/', auth, review.createReview);
ReviewRouter.patch('/:id', auth, getReview, review.patchReview);
ReviewRouter.delete('/:id', auth, getReview, review.deleteReview);

export default ReviewRouter;

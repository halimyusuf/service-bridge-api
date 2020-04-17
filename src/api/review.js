import express from 'express';
import auth from '../middlewares/validateUser';
import Review from '../controllers/review';
const ReviewRouter = express.Router();
const review = new Review();

ReviewRouter.get('/', review.getReviews);
ReviewRouter.get('/:id', review.getReview);
ReviewRouter.post('/', auth, review.createReview);
ReviewRouter.patch('/:id', auth, review.patchReview);
ReviewRouter.delete('/:id', auth, review.deleteReview);

export default ReviewRouter;

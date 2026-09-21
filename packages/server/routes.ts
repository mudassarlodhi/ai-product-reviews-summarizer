import express from 'express';
import { reviewController } from './controllers/review.controller';
import { productController } from './controllers/product.controller';

const router = express.Router();

router.get('/api/products/:id/reviews', reviewController.getReviews);
router.get('/api/products', productController.getProducts);
router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

export default router;

import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/reviewRepository';

const getReviews = async (req: Request, res: Response) => {
   const productId = Number(req.params.id);
   if (isNaN(productId)) {
      return res.status(400).json({
         error: 'Invalid Product ID',
      });
   }

   const product = await productRepository.getProduct(productId);
   if (!product) {
      return res.status(404).json({
         error: "Product not found",
      })
   }

   const reviews = await reviewRepository.getReviews(productId);
   const summary = await reviewRepository.getReviewSummary(productId);


   res.json({
      reviews,
      summary,
   });
};

const summarizeReviews = async (req: Request, res: Response) => {
   const productId = Number(req.params.id);
   if (isNaN(productId)) {
      return res.status(400).json({
         error: 'Invalid Product ID',
      });
   }

   const product = await productRepository.getProduct(productId);
   if (!product) {
      return res.status(400).json({
         error: "Product not found"
      })
   }

   const reviews = await reviewRepository.getReviews(productId, 1);
   if (!reviews.length) {
      return res.status(400).json({
         error: "No reviews exist to summarize for this product",
      })
   }
   const summary = await reviewService.summarizeReviews(productId);

   return res.json({ summary });
};

export const reviewController = {
   getReviews,
   summarizeReviews,
};

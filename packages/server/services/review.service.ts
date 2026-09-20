import { reviewRepository } from '../repositories/reviewRepository';
import { llmClient } from '../llm/client';
import template from "../prompts/summarize-reviews.txt"

const summarizeReviews = async (productId: number): Promise<string> => {
   const reviewSummary = await reviewRepository.getReviewSummary(productId);
   if (reviewSummary) {
      return reviewSummary;
   }
   const reviews = await reviewRepository.getReviews(productId, 10);
   const joinedReviews = reviews.map((review) => review.content).join('\n\n');
   // Send the review to the LLM model
   const prompt = template.replace("{{reviews}}", joinedReviews);
   const { text: summary } = await llmClient.generateText({
      model: 'gpt-4o-mini',
      prompt,
      temperature: 0.2,
      maxTokens: 500,
   });

   await reviewRepository.storeReviewSummary(productId, summary);

   return summary;
   
};

export const reviewService = {
   summarizeReviews,
};

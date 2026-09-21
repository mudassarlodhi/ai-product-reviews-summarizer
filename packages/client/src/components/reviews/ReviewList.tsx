import { HiArrowLeft, HiSparkles } from 'react-icons/hi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import StarRating from './StarRating';
import ReviewSkeleton from './ReviewSkeleton';
import {
   reviewsApi,
   type GetReviewsResponse,
   type SummarizeReviewResponse,
} from './reviewsApi';
import { useNavigate, useParams } from 'react-router-dom';

type Params = {
   id: string;
};

const ReviewList = () => {
   const navigate = useNavigate();
   const { id } = useParams<Params>();
   const productId = Number(id);

   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(Number(productId)),
   });

   const summaryMutation = useMutation<SummarizeReviewResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(Number(productId)),
   });

   const currentSummary =
      reviewsQuery.data?.summary || summaryMutation.data?.summary;

   return (
      <div className="max-w-4xl mx-auto px-4 py-6">
         <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
         >
            <HiArrowLeft className="w-4 h-4" />
            Back to Products
         </button>

         {reviewsQuery.isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
               <h3 className="font-bold text-lg mb-1">
                  Failed to load product details
               </h3>
               <p className="text-sm">
                  Something went wrong while retrieving reviews. Please check
                  your connection or try again later.
               </p>
            </div>
         )}

         {reviewsQuery.isLoading && (
            <div className="space-y-4">
               <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />
               <div className="h-8 bg-gray-100 animate-pulse w-1/4 rounded" />
               <ReviewSkeleton />
               <ReviewSkeleton />
            </div>
         )}

         {reviewsQuery.isSuccess && (
            <>
               {reviewsQuery.data?.reviews?.length > 0 && (
                  <div className="mb-8 border border-purple-100 bg-gradient-to-r from-purple-50/50 to-indigo-50/30 rounded-xl p-5 shadow-sm">
                     <div className="flex items-center gap-2 text-purple-700 font-semibold mb-3">
                        <HiSparkles className="w-5 h-5 animate-pulse text-purple-600" />
                        <span>AI Review Insights</span>
                     </div>

                     {currentSummary ? (
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">
                           {currentSummary}
                        </p>
                     ) : (
                        <div>
                           <p className="text-sm text-gray-500 mb-3">
                              Short on time? Let AI synthesize what buyers loved
                              or disliked about this product.
                           </p>
                           <Button
                              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 shadow-sm font-medium px-4 py-2 rounded-md"
                              onClick={() => summaryMutation.mutate()}
                              disabled={summaryMutation.isPending}
                           >
                              <HiSparkles /> Generate AI Summary
                           </Button>

                           {summaryMutation.isPending && (
                              <div className="py-4 mt-3 border-t border-purple-100">
                                 <ReviewSkeleton />
                              </div>
                           )}

                           {summaryMutation.isError && (
                              <p className="text-red-600 font-medium text-sm mt-3 bg-red-50 border border-red-100 p-2.5 rounded-md">
                                 Could not summarize reviews. Please try again.
                              </p>
                           )}
                        </div>
                     )}
                  </div>
               )}

               <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                  Customer Reviews ({reviewsQuery.data?.reviews?.length || 0})
               </h3>

               {reviewsQuery.data?.reviews?.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                     <p className="text-gray-500 font-medium text-base mb-1">
                        No reviews posted yet
                     </p>
                     <p className="text-gray-400 text-sm">
                        Be the first to share your thoughts about this product
                        once you purchase!
                     </p>
                  </div>
               ) : (
                  <div className="flex flex-col gap-4">
                     {reviewsQuery.data?.reviews.map((review) => (
                        <div
                           key={review.id}
                           className="border border-gray-200 rounded-lg p-5 bg-white shadow-xs hover:shadow-sm transition-shadow duration-150"
                        >
                           <div className="font-semibold text-gray-800 text-base mb-1">
                              {review.author}
                           </div>

                           <div className="mb-3 flex items-center">
                              <StarRating value={review.rating} />
                           </div>

                           <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                              {review.content}
                           </p>
                        </div>
                     ))}
                  </div>
               )}
            </>
         )}
      </div>
   );
};

export default ReviewList;

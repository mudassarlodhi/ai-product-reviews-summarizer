import { HiSparkles } from "react-icons/hi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import StarRating from "./StarRating";
import ReviewSkeleton from "./ReviewSkeleton";
import { reviewsApi, type GetReviewsResponse, type SummarizeReviewResponse } from "./reviewsApi";

type Props = {
    productId: number;
}


const ReviewList = ({ productId }: Props) => {
    const reviewsQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => reviewsApi.fetchReviews(productId)
    });

    const summaryMutation = useMutation<SummarizeReviewResponse>({
        mutationFn: () => reviewsApi.summarizeReviews(productId),
    });



    if (reviewsQuery.isLoading) {
        return <div className="flex flex-col gap-5">
            {[1, 2, 3].map(i => <ReviewSkeleton key={i} />)}
        </div>
    }

    if (reviewsQuery.error) {
        return (<p className="text-red-500">Could not get reviews. Try again!</p>)
    }

    if (reviewsQuery.data?.reviews.length === 0) return <h3 className="text-red-500">No reviews for this product</h3>;

    const currentSummary = reviewsQuery.data?.summary || summaryMutation.data?.summary;

    return (
        <div>
            <div className="mb-5">
                {
                    currentSummary ? (
                        <p>{currentSummary}</p>
                    ) : (
                        <div>
                            <Button
                                className="cursor-pointer"
                                onClick={() => summaryMutation.mutate()}
                                disabled={summaryMutation.isPending}
                            >
                                <HiSparkles /> Summary
                            </Button>
                            {summaryMutation.isPending && (<div className="py-3">
                                <ReviewSkeleton />
                            </div>)}
                            {summaryMutation.isError && <p className="text-red-500 mt-2">Could not summarize reviews. Try again.</p>}
                        </div>)
                }
            </div>
            <div className="flex flex-col gap-5">
                {reviewsQuery.data?.reviews.map(review => (<div key={review.id}>
                    <div className="font-semibold">{review.author}</div>
                    <div className="mb-2"><StarRating value={review.rating} /></div>
                    <p>{review.content}</p>
                </div>))}
            </div>
        </div>
    )
}

export default ReviewList
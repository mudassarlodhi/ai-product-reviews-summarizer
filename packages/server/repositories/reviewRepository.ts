import { prisma } from '../prisma.client';
import dayjs from "dayjs";

const getReviews = (productId: number, limit?: number) => {
   return prisma.review.findMany({
      where: {
         productId,
      },
      orderBy: {
         createdAt: 'desc',
      },
      take: limit,
   });
};

const storeReviewSummary = (productId: number, summary: string) => {
   const now = new Date();
   const expiresAt = dayjs().add(7, "days").toDate();
   const data = {
      content: summary, expiresAt, generatedAt: now, productId
   }


   return prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
   })
}

const getReviewSummary = async (productId: number): Promise<string | null> => {
   const summary = await prisma.summary.findFirst({
      where: {
         AND: [
            { productId },
            { expiresAt: { gt: new Date() } }
         ]
      }
   });
   return summary ? summary.content : null;
}

export const reviewRepository = {
   getReviews,
   storeReviewSummary,
   getReviewSummary,
};

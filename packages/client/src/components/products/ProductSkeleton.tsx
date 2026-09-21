import Skeleton from 'react-loading-skeleton';

const ProductSkeleton = () => {
   return (
      <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white flex flex-col justify-between h-full">
         <div>
            <h2 className="text-xl mb-3">
               <Skeleton width="80%" height={24} />
            </h2>
            <p className="mb-4">
               <Skeleton count={2} />
            </p>
         </div>
         <div className="mt-auto">
            <Skeleton width="40%" height={24} />
         </div>
      </div>
   );
};

export default ProductSkeleton;

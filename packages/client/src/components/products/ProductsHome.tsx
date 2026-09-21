import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from './productsApi';
import ProductSkeleton from './ProductSkeleton';

export interface Product {
   id: number;
   name: string;
   description: string;
   price: number;
}

export interface GetProductsResponse {
   products: Product[];
}

function HomePage() {
   const productsQuery = useQuery<GetProductsResponse>({
      queryKey: ['products'],
      queryFn: () => fetchProducts(),
   });

   if (productsQuery.isError) {
      return (
         <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500 font-medium bg-red-50 px-4 py-3 rounded-md border border-red-200">
               Error fetching products. Try again.
            </div>
         </div>
      );
   }

   return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Product Catalog
         </h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {productsQuery.isLoading
               ? Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                 ))
               : productsQuery.data?.products?.map((product) => (
                    <Link
                       to={`/product/${product.id}`}
                       key={product.id}
                       className="group block no-underline text-inherit"
                    >
                       <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white flex flex-col justify-between h-full transform hover:-translate-y-0.5">
                          <div>
                             <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-150">
                                {product.name}
                             </h2>
                             <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {product.description}
                             </p>
                          </div>
                          <div className="text-lg font-bold text-blue-600 mt-auto">
                             ${product.price.toFixed(2)}
                          </div>
                       </div>
                    </Link>
                 ))}
         </div>
      </div>
   );
}

export default HomePage;

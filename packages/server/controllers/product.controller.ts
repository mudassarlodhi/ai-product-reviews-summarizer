import type { Request, Response } from 'express';
import { productRepository } from '../repositories/product.repository';

const getProducts = async (req: Request, res: Response) => {
   const products = await productRepository.getProducts();
   res.status(200).json({
      products,
   });
};

export const productController = {
   getProducts,
};

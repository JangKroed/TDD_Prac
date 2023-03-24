import { Request, Response, NextFunction } from 'express';
import productModel from '../models/Product';

export default {
    createProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdProduct = await productModel.create(req.body);
            res.status(201).json(createdProduct);
        } catch (error) {
            next(error);
        }
    },

    getProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allProducts = await productModel.find({});
            res.status(200).json(allProducts);
        } catch (error) {
            next(error);
        }
    },

    getProductById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productModel.findById(req.params.productId);
            if (product) res.status(200).json(product);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },

    updateProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(
                req.params.productId,
                req.body,
                {
                    new: true,
                }
            );
            if (updatedProduct) res.status(200).json(updatedProduct);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },

    deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(
                req.params.productId
            );
            if (deletedProduct) res.status(200).json(deletedProduct);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },
};

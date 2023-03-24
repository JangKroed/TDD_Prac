import { Request, Response, NextFunction } from 'express';
import { Products } from '../db/entities';

export default {
    createProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description, price } = req.body;
            if (!name || !description)
                throw new Error('이름 혹은 설명을 입력해주세요.');

            const createdProduct = Products.create({
                name,
                description,
                price,
            });

            await Products.save(createdProduct);

            res.status(201).json(createdProduct);
        } catch (error) {
            next(error);
        }
    },
    getProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allProducts = await Products.find();
            res.status(200).json(allProducts);
        } catch (error) {
            next(error);
        }
    },
    getProductById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const product = await Products.findOne({
                where: { productId: Number(productId) },
            });
            if (product) res.status(200).json(product);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { name, description, price } = req.body;
            const findProduct = await Products.findOne({
                where: { productId: Number(productId) },
            });

            if (!findProduct) throw new Error('잘못된 요청입니다.')

            if (name) findProduct.name = name;
            if (description) findProduct.description = description;
            if (price) findProduct.price = price;

            const updatedProduct = await Products.save(findProduct);

            if (updatedProduct) res.status(200).json(updatedProduct);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await Products.delete(Number(productId));
            if (deletedProduct) res.status(200).json(deletedProduct);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    },
};

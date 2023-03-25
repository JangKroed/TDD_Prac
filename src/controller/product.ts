import { Request, Response, NextFunction } from 'express';
import { Products } from '../db/entities';

interface ProductInfo {
    name: string;
    description: string;
    price?: number;
}

class ProductController extends Products {
    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description, price }: ProductInfo = req.body;
            if (!name || !description) throw new Error('잘못된 요청입니다.');

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
    };

    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allProducts = await Products.find();
            res.status(200).json(allProducts);
        } catch (error) {
            next(error);
        }
    };

    getProductById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
    };

    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { name, description, price }: ProductInfo = req.body;

            const findProduct = await Products.findOne({
                where: { productId: Number(productId) },
            });

            if (!findProduct) return res.status(404).send();

            if (name) findProduct.name = name;
            if (description) findProduct.description = description;
            if (price) findProduct.price = price;

            await Products.save(findProduct);
            res.status(200).json(findProduct);
        } catch (error) {
            next(error);
        }
    };

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;

            const deletedProduct = await Products.delete(productId);

            if (deletedProduct) res.status(200).json(deletedProduct);
            else res.status(404).end();
        } catch (error) {
            next(error);
        }
    };
}

export default new ProductController();

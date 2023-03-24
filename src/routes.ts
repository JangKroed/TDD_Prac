import express from 'express';
const router = express.Router();
import productController from './controller/product';

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;

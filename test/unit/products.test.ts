import productController from '../../src/controller/product';
import productModel from '../../src/models/Product';
import httpMocks from 'node-mocks-http';
import newProduct from '../data/new-product';
import allProduct from '../data/all-products';

const productCreate = jest.fn();
const productFind = jest.fn();
const productFindById = jest.fn();
const productFindByIdAndUpdate = jest.fn();
const productFindByIdAndDelete = jest.fn();

jest.spyOn(productModel, 'create').mockImplementation(productCreate);
jest.spyOn(productModel, 'find').mockImplementation(productFind);
jest.spyOn(productModel, 'findById').mockImplementation(productFindById);
jest.spyOn(productModel, 'findByIdAndUpdate').mockImplementation(productFindByIdAndUpdate);
jest.spyOn(productModel, 'findByIdAndDelete').mockImplementation(productFindByIdAndDelete);

const productId = '123123123123';
const updatedProduct = {
    name: 'update name',
    description: 'update description',
};
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    });
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('should call ProductModel.create', () => {
        productController.createProduct(req, res, next);
        expect(productCreate).toBeCalledWith(newProduct);
    });
    it('should return 201 response code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', async () => {
        productCreate.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        productCreate.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Get', () => {
    it('should have a getProducts function', () => {
        expect(typeof productController.getProducts).toBe('function');
    });
    it('should call ProductModel.find({})', async () => {
        await productController.getProducts(req, res, next);
        expect(productFind).toHaveBeenCalledWith({});
    });
    it('should return 200 response', async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', async () => {
        productFind.mockReturnValue(allProduct);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProduct);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'Error finding product data' };
        const rejectedPromise = Promise.reject(errorMessage);
        productFind.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller GetById', () => {
    it('should have a getProductById', () => {
        expect(typeof productController.getProductById).toBe('function');
    });
    it('should call Product.findById', async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productFindById).toBeCalledWith(productId);
    });
    it('should return json body and reponse code 200', async () => {
        productFindById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return 404 when item doesnt exist', async () => {
        productFindById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'error' };
        const rejectedPromise = Promise.reject(errorMessage);
        productFindById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('Product Controller Update', () => {
    it('should have an updateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    });
    it('should call productModel.findByIdAndUpdate', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        await productController.updateProduct(req, res, next);
        expect(productFindByIdAndUpdate).toHaveBeenCalledWith(
            productId,
            updatedProduct,
            { new: true }
        );
    });
    it('should return json body and response code 200', async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        productFindByIdAndUpdate.mockReturnValue(updatedProduct);
        await productController.updateProduct(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    });
    it('should handle 404 when item doesnt exist', async () => {
        productFindByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'error' };
        const rejectedPromise = Promise.reject(errorMessage);
        productFindByIdAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('Product Controller Delete', () => {
    it('should have a deleteProduct function', () => {
        expect(typeof productController.deleteProduct).toBe('function');
    });
    it('should call ProductModel.findByIdAndDelete', async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next);
        expect(productFindByIdAndDelete).toBeCalledWith(productId);
    });
    it('should return 200 response', async () => {
        const deletedProduct = {
            name: 'deletedProduct',
            description: 'it is deleted',
        };
        productFindByIdAndDelete.mockReturnValue(deletedProduct);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(deletedProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle 404 when item doesnt exist', async () => {
        productFindByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting' };
        const rejectedPromise = Promise.reject(errorMessage);
        productFindByIdAndDelete.mockReturnValue(rejectedPromise);
        await productController.deleteProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

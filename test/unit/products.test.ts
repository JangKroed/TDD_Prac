import productController from '../../src/controller/product';
import { Products } from '../../src/db/entities';
import httpMocks from 'node-mocks-http';
import newProduct from '../data/new-product';
import allProduct from '../data/all-products';

const productCreate = jest.fn();
const productSave = jest.fn();
const productFind = jest.fn();
const productFindOne = jest.fn();
const productDelete = jest.fn();

jest.spyOn(Products, 'create').mockImplementation(productCreate);
jest.spyOn(Products, 'save').mockImplementation(productSave);
jest.spyOn(Products, 'find').mockImplementation(productFind);
jest.spyOn(Products, 'findOne').mockImplementation(productFindOne);
jest.spyOn(Products, 'delete').mockImplementation(productDelete);

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

describe('Product Controller Create And Save', () => {
    beforeEach(() => {
        req.body = newProduct;
    });
    it('should have a saveProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('should call Products.save', () => {
        productController.createProduct(req, res, next);
        expect(productSave).toBeCalledWith(newProduct);
    });
    it('should return 201 response code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', async () => {
        productSave.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        productSave.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('Product Controller Get', () => {
    it('should have a getProducts function', () => {
        expect(typeof productController.getProducts).toBe('function');
    });
    it('should call Products.find()', async () => {
        await productController.getProducts(req, res, next);
        expect(productFind).toHaveBeenCalledWith();
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
    it('should call Products.findOne', async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productFindOne).toBeCalledWith({
            where: { productId: Number(productId) },
        });
    });
    it('should return json body and reponse code 200', async () => {
        productFindOne.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return 404 when item doesnt exist', async () => {
        productFindOne.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'error' };
        const rejectedPromise = Promise.reject(errorMessage);
        productFindOne.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('Product Controller Update', () => {
    it('should have an updateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    });
    // it('should call Products.save', async () => {
    //     req.params.productId = productId;
    //     req.body = updatedProduct;
    //     await productController.updateProduct(req, res, next);
    //     expect(productSave).toHaveBeenCalledWith(updatedProduct);
    // });
    // it('should return json body and response code 200', async () => {
    //     req.params.productId = productId;
    //     req.body = updatedProduct;
    //     productSave.mockReturnValue(updatedProduct);
    //     await productController.updateProduct(req, res, next);
    //     expect(res._isEndCalled()).toBeTruthy();
    //     expect(res.statusCode).toBe(200);
    //     expect(res._getJSONData()).toStrictEqual(updatedProduct);
    // });
    // it('should handle 404 when item doesnt exist', async () => {
    //     productSave.mockReturnValue(null);
    //     await productController.updateProduct(req, res, next);
    //     expect(res.statusCode).toBe(404);
    //     expect(res._isEndCalled()).toBeTruthy();
    // });
    // it('should handle errors', async () => {
    //     const errorMessage = { message: 'error' };
    //     const rejectedPromise = Promise.reject(errorMessage);
    //     productSave.mockReturnValue(rejectedPromise);
    //     await productController.updateProduct(req, res, next);
    //     expect(next).toHaveBeenCalledWith(errorMessage);
    // });
});

describe('Product Controller Delete', () => {
    it('should have a deleteProduct function', () => {
        expect(typeof productController.deleteProduct).toBe('function');
    });
    it('should call Produts.delete', async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next);
        expect(productDelete).toBeCalledWith(productId);
    });
    it('should return 200 response', async () => {
        const deletedProduct = {
            name: 'deletedProduct',
            description: 'it is deleted',
        };
        productDelete.mockReturnValue(deletedProduct);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(deletedProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    // it('should handle 404 when item doesnt exist', async () => {
    //     productDelete.mockReturnValue(null);
    //     await productController.deleteProduct(req, res, next);
    //     expect(res.statusCode).toBe(404);
    //     expect(res._isEndCalled()).toBeTruthy();
    // });
    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting' };
        const rejectedPromise = Promise.reject(errorMessage);
        productDelete.mockReturnValue(rejectedPromise);
        await productController.deleteProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

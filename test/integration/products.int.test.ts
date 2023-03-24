import request from 'supertest';
import app from '../../src/app';
import newProduct from '../data/new-product';
import { typeORMConfig } from '../../src/db/config/connection';
import { Products } from '../../src/db/entities';

let firstProduct: Products;

afterAll(() => {
    typeORMConfig.destroy();
});

it('POST /api/products', async () => {
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: 'phone' });

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
        message:
            'Product validation failed: description: Path `description` is required.',
    });
});

it('GET /api/products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
});

it('GET /api/products/:productId', async () => {
    const response = await request(app).get(
        `/api/products/${firstProduct.productId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
});

it('GET id doenst exist /api/products/:productId', async () => {
    const response = await request(app).get(
        '/api/products/641741b97f12cd82aa71de66'
    );

    expect(response.statusCode).toBe(404);
});

it('PUT /api/products/:productId', async () => {
    const res = await request(app)
        .put(`/api/products/${firstProduct.productId}`)
        .send({ name: 'updated name', description: 'updated description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('updated name');
    expect(res.body.description).toBe('updated description');
});

it('should return 404 on PUT /api/products', async () => {
    const res = await request(app)
        .put('/api/products/' + '641741b97f12cd82aa71de33')
        .send({ name: 'updated name', description: 'updated description' });
    expect(res.statusCode).toBe(404);
});

it('DELETE /api/products', async () => {
    const res = await request(app)
        .delete(`/api/products/${firstProduct.productId}`)
        .send();
    expect(res.statusCode).toBe(200);
});

it('DELETE id doenst exist /api/products/:productId', async () => {
    const res = await request(app)
        .delete(`/api/products/${firstProduct.productId}`)
        .send();
    expect(res.statusCode).toBe(404);
});

import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../../src/app';
import { Products } from '../../src/db/entities';
import newProduct from '../data/new-product';
import mockConnection from '../mockDB/mockConnection';

let firstProduct: Products;
let connection: Connection;

beforeAll(async () => {
    connection = await mockConnection.create();
});

afterAll(async () => {
    await mockConnection.clear();
    await mockConnection.close();
});

it('POST-1 /api/products', async () => {
    const res = await request(app).post('/api/products').send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newProduct.name);
    expect(res.body.description).toBe(newProduct.description);
});

it('should return 500 on POST-2 /api/products', async () => {
    const res = await request(app)
        .post('/api/products')
        .send({ name: 'phone' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({
        message: '잘못된 요청입니다.',
    });
});

it('GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].name).toBeDefined();
    expect(res.body[0].description).toBeDefined();
    firstProduct = res.body[0];
});

it('GET /api/products/:productId', async () => {
    const res = await request(app).get(
        `/api/products/${firstProduct.productId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(firstProduct.name);
    expect(res.body.description).toBe(firstProduct.description);
});

it('GET id doenst exist /api/products/:productId', async () => {
    const res = await request(app).get(
        '/api/products/2222222222222'
    );

    expect(res.statusCode).toBe(404);
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
        .put('/api/products/' + '2222222222222222')
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

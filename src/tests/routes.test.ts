import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('Products Endpoint', () => {
  it('responses with status 200 [GET] Products route', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('responses with status 200 [GET] Products/id route', async () => {
    const response = await request.get('/products/:id');
    expect(response.status).toBe(200);
  });
  it('responses with status 401 [POST] Products/id route [Token Required]', async () => {
    const response = await request.post('/products');
    expect(response.status).toBe(401);
  });
});

describe('Users Endpoint', () => {
  it('responses with status 401 [GET] Users route [Token Required]', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('responses with status 401 [GET] Users/id route [Token Required]', async () => {
    const response = await request.get('/users/:id');
    expect(response.status).toBe(401);
  });

  it('responses with status 400 [POST] Users route [Body Required]', async () => {
    const response = await request.post('/users');
    expect(response.status).toBe(400);
  });

  it('responses with status 401 [POST] Users/authenticate route [Token Required]', async () => {
    const response = await request.get('/users/authenticate');
    expect(response.status).toBe(401);
  });
});

describe('Orders Endpoint', () => {
  it('responses with status 401 [GET] Users route [Token Required]', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });

  it('responses with status 401 [POST] Orders route [Token Required]', async () => {
    const response = await request.post('/orders');
    expect(response.status).toBe(401);
  });

  it('responses with status 401 [GET] Orders/id route [Token Required]', async () => {
    const response = await request.get('/orders/:id');
    expect(response.status).toBe(401);
  });

  it('responses with status 401 [GET] Orders/user_id route [Token Required]', async () => {
    const response = await request.get('/orders/:user_id');
    expect(response.status).toBe(401);
  });
});

import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/authorize.middleware';
import { Product, ProductStore } from '../models/product.model';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const products = await store.show(id);
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const productInfo: Product = req.body;
    const product = await store.create(productInfo);
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;

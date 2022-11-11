import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/authorize.middleware';
import { Order, OrderStore } from '../models/order.model';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  const userId = req.params.user_id;
  try {
    const orders = await store.show(userId);
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const orderInfo: Order = {
    user_id: req.body.userId,
    status: 'active',
  };
  try {
    const order = await store.create(orderInfo);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (error) {
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:user_id', verifyAuthToken, index);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/', verifyAuthToken, addProduct);
};

export default orderRoutes;

import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/authorize.middleware';

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const users = await store.show(id);
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userInfo: User = req.body;
    const user = await store.create(userInfo);
    // @ts-ignore
    let token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { first_name, last_name, password } = req.body;
  try {
    const user = await store.authenticate(
      String(first_name),
      String(last_name),
      String(password)
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/authenticate', verifyAuthToken, authenticate);
};

export default usersRoutes;

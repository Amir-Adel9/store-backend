import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  const users = await store.index(String(id));
  res.json(users);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo: User = req.body;
  const user = await store.create(userInfo);
  // @ts-ignore
  let token = jwt.sign({ user: user }, process.env.JWT_SECRET);
  res.json(token);
};

const authenticate = async (req: Request, res: Response) => {
  const { first_name, last_name, password } = req.body;
  const user = await store.authenticate(
    String(first_name),
    String(last_name),
    String(password)
  );
  res.json(user);
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default usersRoutes;

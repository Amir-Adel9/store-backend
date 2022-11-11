import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    // @ts-ignore
    const token = authorizationHeader.split(' ')[1];
    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401);
    res.json(`Invalid token: ${error}`);
  }
};

export default verifyAuthToken;

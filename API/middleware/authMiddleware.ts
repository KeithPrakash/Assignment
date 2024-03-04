// authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt,{Secret} from 'jsonwebtoken';
import User from '../model/user';
import dotenv from 'dotenv';
dotenv.config();

// Extend Express Request interface to include user information
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authenticateUser = async (
  req: Request & { user?: { userId: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Authentication failed');
    }

    const secretKey:Secret = process.env.JWT_SECRET || '5264859595595695616425595959569595995955925988484154689498148486484898948484568446886' ;
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = { userId: user._id.toString() }; // Add user information to the request

    next(); 
  } catch (error) {
    console.error('Authentication error:', error);
    next(error); 
};
}
import { NextFunction, Request, Response } from 'express';
import * as userService from '../service/user.service';
import { UserObject } from '../utils/POJO/user';
import { UserLoginObject } from '../utils/POJO/user-login';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: UserObject = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await userService.registerUser(data);
    if (result && result.isOk) {
      res.send({
        message: result.message,
        data: result.data,
      });
    } else {
      if (result.message) {
        res.status(400).send({ message: result.message });
      } else {
        res.status(500).send({ message: 'Error when try to register user' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: UserLoginObject = { email: req.body.email, password:req.body.password };
    const result = await userService.login(data);
    if (result && result.isOk) {
      res.send({
        message: result.message,
      });
    } else {
      if (result.message) {
        res.status(400).send({
          message: result.message,
        });
      } else {
        res.status(500).send({ message: 'Error when try to register user' });
      }
    }
  } catch (error) {
    next(error);
  }
};

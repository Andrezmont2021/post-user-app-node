import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error.model";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
const handleError = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Oh no, this is embarrasing. We are having troubles my friend", 500, ""
    );
  }
  console.log((customError as CustomError).additionalInfo);
  res.status((customError as CustomError).status).send((customError as CustomError).message);
};

export default handleError;

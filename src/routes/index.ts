import { Application } from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";


/**
 * Function that contains the different end points to be accessed
 * @param {*} app: Express application
 */
export const routesV1 = (app: Application): void => {
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
// Export the apiV1
export default routesV1;

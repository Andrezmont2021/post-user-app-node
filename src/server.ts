import express, { Application, Request, Response } from 'express';
import { appConfig } from './config/config';
import connectDB from './db/config/sequelize';
import handleError from './middleware/error-handler.middleware';
import routesV1 from './routes/index';

const app: Application = express();
const HOST = appConfig.host;
const PORT = parseInt(appConfig.port);

// Use middleware to support body with JSON
app.use(express.json());
// Use router for ApiV1
routesV1(app);

//Connect to the db (sequelize)
connectDB()
  .authenticate()
  .then(() => console.log('Database connected'));

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the post app');
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('Not found, check your endpoint URL');
});

// Use handle error middleware
app.use(handleError);

app.listen(PORT, HOST, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});

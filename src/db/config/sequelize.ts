import { Sequelize } from "sequelize";
import { appConfig } from "../../config/config";
import { setupModels } from "../models";

const connectDB = (): Sequelize => {
  const user = encodeURIComponent(appConfig.dbUser as string);
  const password = encodeURIComponent(appConfig.dbPassword as string);
  const uri = `mysql://${user}:${password}@${appConfig.dbHost}:${appConfig.dbPort}/${appConfig.dbName}`;

  const sequelize = new Sequelize(uri, {
    dialect: "postgres",
    logging: console.log,
  });

  setupModels(sequelize);

  return sequelize;
};

export default connectDB;
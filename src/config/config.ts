import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  profile: process.env.profile || "dev",
  port: process.env.port || "3000",
  host: process.env.host || "localhost",
  dbHost: process.env.DB_HOST,
  dbName: process.env.DATABASE,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,
  dbPort: process.env.DB_PORT,
};

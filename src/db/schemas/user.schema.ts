import { DataTypes } from "sequelize";

export const USER_DB_NAME = "users";

export const userSchema = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "emailId",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

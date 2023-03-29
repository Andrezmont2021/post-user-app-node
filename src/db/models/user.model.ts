import { Model, Sequelize } from "sequelize";
import { userSchema, USER_DB_NAME } from "../schemas/user.schema";
import { UserObject } from "../../utils/POJO/user";


export class User extends Model<UserObject> {
  static initialize(sequelize: Sequelize) {
    return this.init(userSchema, {
      sequelize,
      tableName: USER_DB_NAME,
      timestamps: false,
    });
  }
}
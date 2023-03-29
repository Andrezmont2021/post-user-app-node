import { Model, Sequelize } from "sequelize";
import { postSchema, POST_DB_NAME } from "../schemas/post.schema";
import { PostObject } from "../../utils/POJO/post";

export class Post extends Model<PostObject> {
  static initialize(sequelize: Sequelize) {
    return this.init(postSchema, {
      sequelize,
      tableName: POST_DB_NAME,
      timestamps: false,
    });
  }
}
import { Model, Sequelize } from 'sequelize';
import {
  postCommentSchema,
  POST_COMMENT_DB_NAME,
} from '../schemas/postComment.schema';
import { PostCommentObject } from '../../utils/POJO/postComment';

export class PostComment extends Model<PostCommentObject> {
  static initialize(sequelize: Sequelize) {
    return this.init(postCommentSchema, {
      sequelize,
      tableName: POST_COMMENT_DB_NAME,
      timestamps: false,
    });
  }
}

import { DataTypes } from 'sequelize';

export const POST_COMMENT_DB_NAME = 'comments';

export const postCommentSchema = {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetimeCreated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  addedByUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

import { Sequelize } from 'sequelize';
import { User } from './user.model';
import { Post } from './post.model';
import { PostComment } from './postComment.model';

export const initializeModels = (sequelize: Sequelize) => {
  User.initialize(sequelize);
  Post.initialize(sequelize);
  PostComment.initialize(sequelize);
};

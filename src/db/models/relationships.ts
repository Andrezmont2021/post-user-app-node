import { User } from './user.model';
import { Post } from './post.model';
import { PostComment } from './postComment.model';

export const setupRelationships = () => {
  User.hasMany(Post, { foreignKey: 'addedByUserId' });
  Post.belongsTo(User, { foreignKey: 'addedByUserId' });
  Post.hasMany(PostComment, { foreignKey: 'postId' });
  PostComment.belongsTo(Post, { foreignKey: 'postId' });
  User.hasMany(PostComment, { foreignKey: 'addedByUserId' })
  PostComment.belongsTo(User, { foreignKey: 'addedByUserId' });
};

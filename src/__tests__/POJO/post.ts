import { PostObject } from '../../utils/POJO/post';
import { PostCommentObject } from '../../utils/POJO/postComment';

export interface PostModel {
  dataValues: PostObject;
  increment?: any;
  destroy?: any;
}

export interface PostCommentModel {
  dataValues: PostCommentObject;
}

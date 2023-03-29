import { PostCommentDTO } from '../POJO/postComment';
import { UserModelMapper } from './user.modelmapper';

export class PostCommentModelMapper {
  static toDto(postComment: any): PostCommentDTO {
    return {
      id: postComment.id,
      comment: postComment.comment,
      datetimeCreated: postComment.datetimeCreated,
      user: UserModelMapper.toDto(postComment.User.dataValues),
    };
  }
}

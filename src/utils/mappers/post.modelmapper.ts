import { PostDTO } from '../POJO/post';
import { UserModelMapper } from './user.modelmapper';

export class PostModelMapper {
  static toDto(post: any): PostDTO {
    return {
      id: post.id,
      description: post.description,
      imagePath: post.imagePath,
      likeCount: post.likeCount,
      dislikeCount: post.dislikeCount,
      datetimeCreated: post.datetimeCreated,
      user: UserModelMapper.toDto(post.User.dataValues),
    };
  }
}

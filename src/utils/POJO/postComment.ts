import { PostDTO } from './post';
import { UserObject } from './user';

// For creates and updates data in/out
export interface PostCommentObject {
  id?: number;
  postId: number;
  comment: string;
  datetimeCreated?: string;
  addedByUserId: number;
}
// For queries
export interface PostCommentDTO {
  id?: number;
  post?: PostDTO;
  comment: string;
  datetimeCreated: string;
  user: UserObject;
}

export interface ResponseAdd {
  isOk: boolean;
  message: string;
  data: PostCommentObject;
}

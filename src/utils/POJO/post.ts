import { UserObject } from "./user";

// For creates and updates data in/out
export interface PostObject {
  id?: number;
  description: string;
  imagePath: string;
  likeCount?: number;
  dislikeCount?: number;
  datetimeCreated?: string;
  addedByUserId: number;
}
// For queries
export interface PostDTO {
  id: number;
  description: string;
  imagePath: string;
  likeCount: number;
  dislikeCount: number;
  datetimeCreated: string;
  user: UserObject
}

export interface GeneralResponse {
  message: string;
  data: PostObject;
}

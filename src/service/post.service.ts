import { Post } from '../db/models/post.model';
import { PostComment } from '../db/models/postComment.model';
import { User } from '../db/models/user.model';
import { PostObject, GeneralResponse } from '../utils/POJO/post';
import { PostCommentObject, ResponseAdd } from '../utils/POJO/postComment';
import { CustomError } from '../utils/custom-error.model';

export const registerPost = async (
  data: PostObject
): Promise<GeneralResponse> => {
  try {
    const result = await Post.create(data);
    return {
      message: 'Post created successfully',
      data: result.dataValues,
    };
  } catch (error: any) {
    throw new CustomError(
      'Error when try to create a post',
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    return await Post.findAll({
      include: [User],
    });
  } catch (error: any) {
    throw new CustomError(
      'Error when try to get all posts',
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const addPostComment = async (
  data: PostCommentObject
): Promise<ResponseAdd> => {
  try {
    const result = await PostComment.create(data);
    return {
      isOk: true,
      message: 'Post comment added successfully',
      data: result.dataValues,
    };
  } catch (error: any) {
    throw new CustomError(
      'Error when try to add a post comment',
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const getPostComments = async (
  postId: number
): Promise<PostComment[]> => {
  try {
    return await PostComment.findAll({
      where: {
        postId,
      },
      include: [User],
    });
  } catch (error: any) {
    throw new CustomError(
      `Error when try to get post comments with postId ${postId}`,
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const updateLikesByPostId = async (postId: number): Promise<string> => {
  try {
    const post = await Post.findByPk(postId);
    if (post) {
      await post.increment('likeCount');
      return `Likes updated to post # ${postId}`;
    } else {
      throw new CustomError(
        `Error when try to find the post with id ${postId}`,
        404,
        ''
      );
    }
  } catch (error: any) {
    throw new CustomError(
      error?.message ||
        `Error when try to update the likes counter to the post ${postId}`,
      error?.status || 500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const updateDislikesByPostId = async (
  postId: number
): Promise<string> => {
  try {
    const post = await Post.findByPk(postId);
    if (post) {
      await post.increment('dislikeCount');
      return `Dislikes updated to post # ${postId}`;
    } else {
      throw new CustomError(
        `Error when try to find the post with id ${postId}`,
        404,
        ''
      );
    }
  } catch (error: any) {
    throw new CustomError(
      error?.message ||
        `Error when try to update the dislikes counter to the post ${postId}`,
      error?.status || 500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const deletePost = async (postId: number): Promise<GeneralResponse> => {
  try {
    const post = await Post.findByPk(postId);
    if (post) {
      await post.destroy();
      return {
        message: 'Post deleted successfully',
        data: post.dataValues,
      };
    } else {
      throw new CustomError(
        `Error when try to find the post with id ${postId}`,
        404,
        ''
      );
    }
  } catch (error: any) {
    throw new CustomError(
      error?.message || 'Error when try to delete a post',
      error?.status || 500,
      error?.original?.sqlMessage || error.message
    );
  }
};

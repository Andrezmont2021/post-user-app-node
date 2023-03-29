import { NextFunction, Request, Response } from 'express';
import * as postService from '../service/post.service';
import { PostDTO, PostObject } from '../utils/POJO/post';
import { PostModelMapper } from '../utils/mappers/post.modelmapper';
import { PostCommentDTO, PostCommentObject } from '../utils/POJO/postComment';
import { PostCommentModelMapper } from '../utils/mappers/postComment.modelmapper';

export const registerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: PostObject = {
      description: req.body.description,
      imagePath: req.body.imagePath,
      addedByUserId: req.body.addedByUserId,
    };
    const result = await postService.registerPost(data);
    if (result && result.data) {
      res.send({
        message: result.message,
        data: result.data,
      });
    } else {
      if (result.message) {
        res.status(400).send({ message: result.message });
      } else {
        res.status(500).send({ message: 'Error when try to register a post' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let postList: PostDTO[] = [];
    const posts = await postService.getAllPosts();
    posts.forEach((post) => {
      postList.push(PostModelMapper.toDto(post));
    });
    res.send({ data: postList });
  } catch (error) {
    next(error);
  }
};

export const addPostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: PostCommentObject = {
      postId: req.body.postId,
      comment: req.body.comment,
      addedByUserId: req.body.addedByUserId,
    };
    const result = await postService.addPostComment(data);
    if (result && result.isOk) {
      res.send({
        message: result.message,
        data: result.data,
      });
    } else {
      if (result.message) {
        res.status(400).send({ message: result.message });
      } else {
        res
          .status(500)
          .send({ message: 'Error when try to add a post comment' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postCommentsDTO: PostCommentDTO[] = [];
    const postComments = await postService.getPostComments(
      parseInt(req.query.postId as string)
    );

    postComments.forEach((postComment) => {
      postCommentsDTO.push(PostCommentModelMapper.toDto(postComment));
    });

    res.send({ data: postCommentsDTO });
  } catch (error) {
    next(error);
  }
};

export const updateLikesByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await postService.updateLikesByPostId(
      parseInt(req.query.postId as string)
    );
    res.send({ message: result });
  } catch (error) {
    next(error);
  }
};

export const updateDislikesByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await postService.updateDislikesByPostId(
      parseInt(req.query.postId as string)
    );
    res.send({ message: result });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await postService.deletePost(parseInt(req.params.postId));
    if (result && result.data) {
      res.send({
        message: result.message,
        data: result.data,
      });
    } else {
      if (result.message) {
        res.status(400).send({ message: result.message });
      } else {
        res.status(500).send({ message: 'Error when try to delete a post' });
      }
    }
  } catch (error) {
    next(error);
  }
};

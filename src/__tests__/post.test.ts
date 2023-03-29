import { Post } from '../db/models/post.model';
import { PostComment } from '../db/models/postComment.model';
import { User } from '../db/models/user.model';
import * as postService from '../service/post.service';
import { PostObject } from '../utils/POJO/post';
import { PostCommentObject } from '../utils/POJO/postComment';
import { UserObject } from '../utils/POJO/user';
import { PostCommentModel, PostModel } from './POJO/post';
import { UserModel } from './POJO/user';

// POST
let postObject: PostObject;
let postEntity: PostObject;
let postEntity2: any;
let postEntity3: any;
let postModel: PostModel;
let postModelFindAll: PostModel[];
// USER
let userObject: UserObject;
let userModel: UserModel;
let userEntity: UserObject;
// POST COMMENT
let postCommentObject: PostCommentObject;
let postCommentEntity: PostCommentObject;
let postCommentModel: PostCommentModel;
let postCommentModelFindAll: PostCommentModel[];

// Mocks declarations
let postModelMockCreate: jest.SpyInstance;
let postModelMockFindAll: jest.SpyInstance;
let postModelMockFindByPk: jest.SpyInstance;
let postCommentModelMockCreate: jest.SpyInstance;
let postCommentModelMockFindAllPostId: jest.SpyInstance;

beforeAll(() => {
  postObject = {
    description: 'Post from test',
    imagePath: '/path/post1.png',
    addedByUserId: 159,
  };
  postEntity = {
    id: 1,
    likeCount: 0,
    dislikeCount: 0,
    datetimeCreated: '2023-02-22 15:16:40',
    ...postObject,
  };

  userObject = {
    firstName: 'John',
    lastName: 'Owen',
    email: 'john@example.com',
    password: '1234',
  };
  userEntity = {
    id: 1,
    ...userObject,
  };
  userModel = {
    dataValues: {
      ...userEntity,
    },
  };

  postEntity2 = {
    id: 2,
    likeCount: 0,
    dislikeCount: 0,
    datetimeCreated: '2023-02-22 15:16:40',
    ...userModel,
    ...postObject,
  };

  postEntity3 = {
    id: 3,
    likeCount: 0,
    dislikeCount: 0,
    datetimeCreated: '2023-02-22 15:16:40',
    ...userModel,
    ...postObject,
  };
  postModel = {
    dataValues: {
      ...postEntity,
    },
    increment: jest.fn(() => Promise.resolve()),
    destroy: jest.fn(() => Promise.resolve())
  };

  postModelFindAll = [
    {
      dataValues: {
        ...postEntity2,
      },
    },
    {
      dataValues: {
        ...postEntity3,
      },
    },
  ];

  postCommentObject = {
    comment: 'Comment for post',
    postId: 15,
    addedByUserId: 159,
  };

  postCommentEntity = {
    id: 12,
    comment: 'Comment for post',
    datetimeCreated: '2023-02-22 15:16:40',
    postId: 15,
    addedByUserId: 159,
    ...userModel,
  };

  postCommentModel = {
    dataValues: {
      ...postCommentEntity,
    },
  };

  postCommentModelFindAll = [
    {
      ...postCommentModel,
    },
    {
      dataValues: {
        id: 13,
        comment: 'Comment 2 for post',
        datetimeCreated: postCommentEntity.datetimeCreated,
        postId: postCommentEntity.postId,
        addedByUserId: postCommentEntity.addedByUserId,
        ...userModel,
      },
    },
  ];

  //Mocks
  postModelMockCreate = jest.spyOn(Post, 'create');
  postModelMockCreate.mockImplementation(() => Promise.resolve(postModel));

  postModelMockFindAll = jest.spyOn(Post, 'findAll');
  postModelMockFindAll.mockImplementation(() =>
    Promise.resolve(postModelFindAll)
  );

  postCommentModelMockCreate = jest.spyOn(PostComment, 'create');
  postCommentModelMockCreate.mockImplementation(() =>
    Promise.resolve(postCommentModel)
  );

  postCommentModelMockFindAllPostId = jest.spyOn(PostComment, 'findAll');
  postCommentModelMockFindAllPostId.mockImplementation(() =>
    Promise.resolve(postCommentModelFindAll)
  );

  postModelMockFindByPk = jest.spyOn(Post, 'findByPk');
  postModelMockFindByPk.mockImplementation(() => Promise.resolve(postModel));
});

afterAll(() => {
  // Clean up the spies
  jest.restoreAllMocks();
});

describe('Register a post', () => {
  test('it should create a new post', async () => {
    const result = await postService.registerPost(postObject);
    expect(result.message).toBe('Post created successfully');
    expect(result?.data?.id).toBe(1);
    expect(result?.data?.description).toBe('Post from test');
    expect(postModelMockCreate).toHaveBeenCalledWith(postObject);
  });
});

describe('Get all posts', () => {
  test('it should get all posts', async () => {
    const result = await postService.getAllPosts();
    expect(result?.length).toBe(2);
    expect(result[0].dataValues.id).toBe(2);
    expect(result[1].dataValues.id).toBe(3);
    expect(postModelMockFindAll).toHaveBeenCalledWith({
      include: [User],
    });
  });
});

describe('Add a post comment', () => {
  test('it should add a post comment', async () => {
    const result = await postService.addPostComment(postCommentObject);
    expect(result.isOk).toBe(true);
    expect(result.message).toBe('Post comment added successfully');
    expect(result?.data?.id).toBe(12);
    expect(result?.data?.comment).toBe('Comment for post');
    expect(postCommentModelMockCreate).toHaveBeenCalledWith(postCommentObject);
  });
});

describe('Get all comments for specific post', () => {
  test('it should get all the post comments related to the post (post id)', async () => {
    const result = await postService.getPostComments(15);
    expect(result?.length).toBe(2);
    expect(result[0].dataValues.id).toBe(12);
    expect(result[1].dataValues.id).toBe(13);
    expect(postCommentModelMockFindAllPostId).toHaveBeenCalledWith({
      where: {
        postId: 15,
      },
      include: [User],
    });
  });
});

describe('Update likes for a specific post', () => {
  test('it should increment the like counter to the post (post id) and show a successfully message', async () => {
    const result = await postService.updateLikesByPostId(1);
    expect(result).toBe('Likes updated to post # 1');
    expect(postModelMockFindByPk).toHaveBeenCalledWith(1);
    expect(postModel.increment).toHaveBeenCalledWith('likeCount');
  });
});

describe('Update dislikes for a specific post', () => {
  test('it should increment the dislike counter to the post (post id) and show a successfully message', async () => {
    const result = await postService.updateDislikesByPostId(1);
    expect(result).toBe('Dislikes updated to post # 1');
    expect(postModelMockFindByPk).toHaveBeenCalledWith(1);
    expect(postModel.increment).toHaveBeenCalledWith('dislikeCount');
  });
});

describe('Delete a specific post', () => {
  test('it should delete a post (using post id) and show a successfully message', async () => {
    const result = await postService.deletePost(1);
    expect(result.message).toBe('Post deleted successfully');
    expect(result.data.id).toBe(1);
    expect(result.data.description).toBe('Post from test');
    expect(postModelMockFindByPk).toHaveBeenCalledWith(1);
    expect(postModel.destroy).toHaveBeenCalledWith();
  });
});

import { Router } from 'express';
import * as postController from '../controller/post.controller';

const router = Router();

router.post('/register', postController.registerPost);
router.post('/addPostComment', postController.addPostComment);
router.get('/getAll', postController.getAllPosts);
router.get('/getPostComments', postController.getPostComments);
router.patch('/updateLikes', postController.updateLikesByPostId);
router.patch('/updateDislikes', postController.updateDislikesByPostId);
router.delete('/:postId', postController.deletePost)

export default router;

import { Router } from 'express';
import * as userController from '../controller/user.controller';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.login);

export default router;

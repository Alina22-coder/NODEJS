import { Router } from 'express';
import { commonMiddleware } from '../middleware/commonMiddleware';
import { UserValidator } from '../validators/UserValidator';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post(
    '/sing-up',
    commonMiddleware.validateBody(UserValidator.create), authController.singUp,
);

router.post('/sing-in', authController.signIn);

export const authRouter = router;
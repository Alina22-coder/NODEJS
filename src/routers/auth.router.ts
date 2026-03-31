import { Router } from 'express';
import { commonMiddleware } from '../middleware/commonMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserValidator } from '../validators/UserValidator';
import { authController } from '../controllers/auth.controller';
import { AuthValidator } from '../validators/auth.validator';
import { RecoveryValidator } from '../validators/RecoveryValidator';

const router = Router();

router.post(
    '/sing-up',
    commonMiddleware.validateBody(UserValidator.create), authController.singUp,
);
router.post('/sing-in', authController.signIn);
router.post('/refresh', commonMiddleware.validateBody(AuthValidator.refreshToken), authMiddleware.checkRefreshToken, authController.refresh);
router.get('/me', authMiddleware.checkAccessToken, authController.me);
router.patch('/activate/:token', authController.activate);
router.post('/recovery', commonMiddleware.validateBody(RecoveryValidator.emailSchema), authController.passwordRecoveryRequest);
router.post('/recovery/:token', commonMiddleware.validateBody(AuthValidator.validatePassword), authController.recoveryPassword)

export const authRouter = router;
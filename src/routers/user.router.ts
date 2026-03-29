import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware.js";
import { UserValidator } from "../validators/user.validator.js";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);

export const userRouter = router;

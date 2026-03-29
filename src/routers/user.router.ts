import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware.js";
import { UserValidator } from "../validators/user.validator.js";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", commonMiddleware.isValidate("id"), userController.getById);

router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);

router.put(
    "/:id",
    commonMiddleware.isValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);

router.delete(
    "/:id",
    commonMiddleware.isValidate("id"),
    userController.deleteById,
);

export const userRouter = router;

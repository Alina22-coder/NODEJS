import type { Request, Response, NextFunction } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import type { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { ITokenPayload } from "../interfaces/token.interface";
import { ApiError } from "../errors/api.error";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e)
        }
    }

    // public async create(req: Request, res: Response) {
    //     const user = req.body as IUserCreateDTO;
    //     const data = await userService.create(user);
    //     res.status(StatusCodesEnum.CREATED).json(data);
    // }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e)
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = req.body as IUserUpdateDTO;
            const updateUser = await userService.updateById(id, user);
            res.status(StatusCodesEnum.OK).json(updateUser);
        } catch (e) {
            next(e)
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();

        } catch (e) {
            next(e)
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals.tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError('Not permitted', StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.blockUser(userId);
            res.status(StatusCodesEnum.OK).json(data);

        } catch (e) {
            next(e)
        }
    }

    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals.tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError('Not permitted', StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.unBlockUser(userId);
            res.status(StatusCodesEnum.OK).json(data);

        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController();

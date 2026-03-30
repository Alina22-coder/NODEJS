import type { Request, Response, NextFunction } from "express";

import { StatusCodesEnum } from "../enums/status-codes";
import type { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

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
}

export const userController = new UserController();

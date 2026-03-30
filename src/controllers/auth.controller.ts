import { Request, Response, NextFunction } from "express"
import { IUserCreateDTO } from '../interfaces/user.interface'
import { authService } from '../services/auth.service'
import { StatusCodeEnum } from '../enums/status-code.enum'

class AuthController {
    public async singUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.singUp(body);
            res.status(StatusCodeEnum.CREATED).json(data);
        } catch (e) {
            next(e)
        }
    }

    public signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as any;
            const data = await authService.singIn(dto);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e)
        }
    }
}

export const authController = new AuthController();
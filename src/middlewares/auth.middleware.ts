import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../path/to/ApiError'
import { StatusCodesEnum } from '../path/to/StatusCodesEnum'
import { tokenService } from '../path/to/tokenService'
import { IRefresh } from '../path/to/IRefresh'
import { ITokenPayload } from '../path/to/ITokenPayload'
import { RoleEnum } from '../enums/role.enum'
import { userService } from '../services/user.service'

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new ApiError('No token provided', StatusCodesEnum.UNAUTHORIZED)
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                throw new ApiError('No token provided', StatusCodesEnum.UNAUTHORIZED)
            }

            const tokenPayload = tokenService.verifyToken(accessToken, 'access');

            const isTokenExists = await tokenService.isTokenExists(accessToken,
                "accessToken")
            if (!isTokenExists) {
                throw new ApiError('Invalid token', StatusCodesEnum.UNAUTHORIZED)
            }

            const isActive = await userService.isActive(tokenPayload.userId);
            if (!isActive) {
                throw new ApiError('Account is not active', StatusCodesEnum.FORBIDDEN)
            }

            req.res.locals.tokenPayload = tokenPayload;

            next()
        } catch (e) {
            next(e)
        }

    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body as IRefresh;
            if (!refreshToken) {
                throw new ApiError('No refresh token provided', StatusCodesEnum.FORBIDDEN);
            }



            const tokenPayload = tokenService.verifyToken(refreshToken, 'refresh');

            const isTokenExists = await tokenService.isTokenExists(refreshToken, 'refreshToken')
            if (!isTokenExists) {
                throw new ApiError('Invalid token', StatusCodesEnum.FORBIDDEN)
            }

            req.res.locals.tokenPayload = tokenPayload;

            next()
        } catch (e) {
            next(e)
        }

    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;

            if (role !== RoleEnum.ADMIN) {
                throw new ApiError('No has permissions', StatusCodesEnum.FORBIDDEN);
            }
        } catch (e) {
            next(e)
        }

    }
}

export const authMiddleware = new AuthMiddleware()
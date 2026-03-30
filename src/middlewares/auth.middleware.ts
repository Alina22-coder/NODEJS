import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../path/to/ApiError'
import { StatusCodeEnum } from '../path/to/StatusCodeEnum'
import { tokenService } from '../path/to/tokenService'
import { IRefresh } from '../path/to/IRefresh'

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new ApiError('No token provided', StatusCodeEnum.UNAUTHORIZED)
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                throw new ApiError('No token provided', StatusCodeEnum.UNAUTHORIZED)
            }

            const tokenPayload = tokenService.verifyToken(accessToken, 'access');

            const isTokenExists = await tokenService.isTokenExists(accessToken,
                "accessToken")
            if (!isTokenExists) {
                throw new ApiError('Invalid token', StatusCodeEnum.UNAUTHORIZED)
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
                throw new ApiError('No refresh token provided', StatusCodeEnum.FORBIDDEN);
            }



            const tokenPayload = tokenService.verifyToken(refreshToken, 'refresh');

            const isTokenExists = await tokenService.isTokenExists(refreshToken, 'refreshToken')
            if (!isTokenExists) {
                throw new ApiError('Invalid token', StatusCodeEnum.FORBIDDEN)
            }

            req.res.locals.tokenPayload = tokenPayload;

            next()
        } catch (e) {
            next(e)
        }

    }
}

export const authMiddleware = new AuthMiddleware()
import { config } from "../configs/config";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/api.error";
import { StatusCodesEnum } from "../enums/status-code.enum";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME
        });

        return {
            accessToken,
            refreshToken
        };
    }

    public verifyToken(token: string, type: 'access' | 'refresh'): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = config.JWT_REFRESH_SECRET;
                    break;

                default:
                    throw new ApiError('Invalid token type', StatusCodesEnum.BAD_REQUEST)
            }

            return jwt.verify(token, secret) as ITokenPayload;

        } catch (e) {
            throw new ApiError('Invalid token', StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public async isTokenExists(token: string, type: 'accessToken' | 'refreshToken'): Promise<boolean> {
        const iTokenPromise = await tokenRepository.findByParams({ [type]: token });
        return !!iTokenPromise;
    }

}

export const tokenService = new TokenService();
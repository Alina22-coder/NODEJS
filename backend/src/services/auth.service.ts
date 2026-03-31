import { IUser, IUserCreateDTO, ITokenPair } from '../interfaces/user.interface';
import { userService } from './user.service';
import { passwordService } from './password.service';
import { tokenService } from './token.service';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../errors/api.error';
import { StatusCodesEnum } from '../enums/status-code.enum';
import { IAuth } from '../interfaces/auth.interface';
import { emailService } from './email.service';
import { EmailEnum } from '../enums/email.enum';
import { emailConstants } from '../constants/email.constants';
import { config } from '../configs/config';
import { ActionTokenTypeEnum } from '../enums/action-token-type.enum';

export class AuthService {
    public async signUp(user: IUserCreateDTO): Promise<{ user: IUser, tokens: ITokenPair }> {
        await this.userService.isEmailUnique(user.email);
        const password = await this.passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });

        const token = tokenService.generateActionToken({ userId: newUser._id, role: newUser.role }, ActionTokenTypeEnum.ACTIVATE);

        await emailService.sendEmail(newUser.email, emailConstants[EmailEnum.ACTIVATE], { name: newUser.name, url: `${config.FRONTEND_URL}/activate/${token}` });

        return { user: newUser, tokens }
    };

    public async singIn(dto: IAuth): Promise<{ user: IUser, tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError('Invalid email or password', StatusCodesEnum.UNAUTHORIZED);
        }

        const isValidPassword = await passwordService.comparePassword(dto.password, user.password);

        if (!user.isActive) {
            throw new ApiError('Account is not active', StatusCodesEnum.FORBIDDEN);

        }

        if (!isValidPassword) {
            throw new ApiError('Invalid email or password', StatusCodesEnum.UNAUTHORIZED);
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };

    };

    public async activate(token: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.ACTIVATE)
        return await userService.updateById(userId, { isActive: true })
    }

    public async recoveryPasswordRequest(user: IUser): Promise<void> {
        const token = tokenService.generateActionToken({ userId: user._id, role: user.role }, ActionTokenTypeEnum.RECOVERY)
        const url = `${config.FRONTEND_URL}/recovery/${token}`
        await emailService.sendEmail(user.email, emailConstants[EmailEnum.RECOVERY], { url })

    }

    public async recoveryPassword(token: string, password: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.RECOVERY);
        const hashedPassword = await passwordService.hashPassword(password);
        return await userService.updateById(userId, { password: hashedPassword });
    }
};

export const authService = new AuthService();
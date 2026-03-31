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
import { templatesConstants } from '../constants/templates.constants';

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
        await emailService.sendEmail(newUser.email, 'Welcome', templatesConstants.WELCOME, { name: newUser.name });
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
};

export const authService = new AuthService();
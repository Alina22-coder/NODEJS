import { ITokenModel } from '../interfaces/token.interface';
import { Token, IToken } from '../models/Token';

class TokenRepository {
    public create(dto: ITokenModel): Promise<IToken> {
        return Token.create(dto);
    }

    public findByParams(params: Partial<IToken>): Promise<IToken> {
        return Token.findOne(params)

    }
}

export const tokenRepository = new TokenRepository();
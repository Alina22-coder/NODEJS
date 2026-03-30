import { Token, IToken } from '../models/Token';

class TokenRepository {
    public create(dto: any): Promise<IToken> {
        return Token.create(dto);
    }

    public findByParams(params: Partial<IToken>): Promise<IToken> {
        return Token.findOne(params)

    }
}

export const tokenRepository = new TokenRepository();
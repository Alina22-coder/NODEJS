import { Schema, model } from 'mongoose';
import { User } from './user.model';

interface IToken {
    accessToken: string;
    refreshToken: string;
    _userId: Schema.Types.ObjectId;
}

const tokenSchema = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User }
},
    { timestamps: true, versionKey: false },
);

export const Token = model<IToken>('Tokens', tokenSchema);
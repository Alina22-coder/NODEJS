import { IBase } from "./base.interface";
import { RoleEnum } from "../enums/role.enum";

export interface IToken extends IBase {
    _id: string,
    accessToken: string,
    refreshToken: string,
    _userId: string
}

export interface ITokenPayload {
    userId: string,
    role: RoleEnum
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

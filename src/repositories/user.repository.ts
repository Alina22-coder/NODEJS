import type { IUser, IUserDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }
    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }
    // public getById(userId: string): Promise<IUser>{
    //     return User.findById(userId);
    // }

    public async getById(userId: string): Promise<IUser> {
        const user = await User.findById(userId).exec();
        if (!user) throw new Error("User not found");
        return user;
    }

    // public update(userId: string): Promise<IUser>{
    //     return User.updateOne()
    // }
}

export const userRepository = new UserRepository();

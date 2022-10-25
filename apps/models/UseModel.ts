import BaseModel from "./BaseModel";
import { Prisma, User } from "@prisma/client";

export default class UserModel extends BaseModel {
    static model: string = 'user';

    static query (): Prisma.UserDelegate<any> {
        return this.getInstance()[this.model];
    }

    static async getByName(name: string): Promise<User[]> {
        return await this.query().findMany({
            where: {
                name,
            },
        });
    }
}
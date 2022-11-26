import BaseModel from "./BaseModel";
import { Prisma, User } from "@prisma/client";

export default class UserModel extends BaseModel {
    static model = this.prisma.user;
    
    static async getByName(name: string): Promise<User[]> {
        return await this.model.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
    }
}
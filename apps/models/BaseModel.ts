import { PrismaService } from "@libs/core/database";
import { Prisma } from "@prisma/client";

export default class Model extends PrismaService {
    static model: string = 'name';
    static prisma: PrismaService = this.getInstance();

    static getInstance(): PrismaService {
        if (!this.prisma) this.prisma = new PrismaService();
        return this.prisma;
    }
    
    static query () {
        return this.getInstance()[this.model];
    }

    static async getAll<T extends any>(): Promise<T[]> {
        return this.query().findMany({
            where: {}
        });
    }

    static async getById(id: any) {
        return this.query().findFirst({
            where: {
                id,
            }
        });
    }

}
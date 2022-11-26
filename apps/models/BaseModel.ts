import { PrismaService } from "@libs/core/database";

export default class Model extends PrismaService {
    static prisma: PrismaService = this.getInstance();

    static getInstance(): PrismaService {
        if (!this.prisma) this.prisma = new PrismaService();
        return this.prisma;
    }

    static connect() {
        return this.prisma.$connect().then( () => {
            console.log("DATABASE IS RUNNING");
        }).catch(e => {
            console.log("CAN'T REACH TO DATABASE");
        })
    }
}
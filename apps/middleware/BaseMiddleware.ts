import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@root/libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";
import { RequestT } from "@root/libs/core/request";
import { ResponseT } from "@root/libs/core/response";
import { QueueService } from "../queue/index.service";

@Injectable()
export class BaseMiddleware implements NestMiddleware {
    constructor(
        readonly prismaService: PrismaService,
        readonly loggerService: LoggerService,
        readonly queueService: QueueService,
        readonly jwtService: JwtService,
    ) { }
    async use(req: RequestT, res: ResponseT, next: (error?: any) => void) {

        next();
    }
}
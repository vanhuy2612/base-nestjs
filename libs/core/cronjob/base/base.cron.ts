import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/index.service";
import { LoggerService } from "../../logger/index.service";
import { QueueService } from "../../queue/index.service";

@Injectable()
export class BaseCronjob {
    constructor(
        readonly prismaService: PrismaService,
        readonly loggerService: LoggerService,
    ) { }
}
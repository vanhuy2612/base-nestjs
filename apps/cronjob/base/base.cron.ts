import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../libs/core/database/index.service";
import { LoggerService } from "../../../libs/core/logger/index.service";
import { QueueService } from "../../queue/index.service";

@Injectable()
export class BaseCronjob {
    constructor(
        readonly prismaService: PrismaService,
        readonly loggerService: LoggerService,
    ) { }
}
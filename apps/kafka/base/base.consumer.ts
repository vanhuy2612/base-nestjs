import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/core/database/index.service';
import { LoggerService } from '../../../libs/core/logger/index.service';

@Injectable()
export class BaseConsumer {
    constructor(
        readonly prismaService: PrismaService,
        readonly loggerService: LoggerService,
    ) { }
}

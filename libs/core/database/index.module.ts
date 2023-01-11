import { Module } from '@nestjs/common';
import { PrismaService } from './index.service';
@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }

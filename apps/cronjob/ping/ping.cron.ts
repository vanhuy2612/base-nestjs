import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { BaseCronjob } from "../base/base.cron";

@Injectable()
export class PingCronjob extends BaseCronjob {
    @Cron(CronExpression.EVERY_30_SECONDS)
    async handle() {
        // this.loggerService.debug('Called every 30 seconds');
        // const allUsers = await this.prismaService.user.findMany();
        // console.log("After get all");
        // this.loggerService.log('Cronjob', allUsers);
        return true;
    }
}
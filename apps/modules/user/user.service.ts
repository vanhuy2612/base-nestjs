import { Injectable } from '@nestjs/common';
import { QUEUE_PROCESS } from '@root/apps/queue/constant';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService {

  async healCheck(): Promise<any> {
    // const allUsers = await this.prismaService.user.findMany();
    // this.loggerService.log('info', allUsers);
    await this.queueService.mailQueue.add(QUEUE_PROCESS.SEND_MAIL, {
      data: 1,
    });
    return {
      // allUsers,
    };
  }
}

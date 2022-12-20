import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';

@Injectable()
export class AppService extends BaseService {

  async healCheck(): Promise<any> {
    const allUsers = await this.prismaService.user.findMany();
    this.loggerService.log('info', allUsers);
    return {
      allUsers,
    };
  }
}

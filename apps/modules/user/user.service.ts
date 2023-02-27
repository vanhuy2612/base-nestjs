import { Injectable } from '@nestjs/common';
import { QUEUE_PROCESS } from '@root/apps/queue/common';
import { APIException } from '@root/libs/core/exception/APIException';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService {
  async index(): Promise<any> {
    throw new APIException(3000, 'List User Not Found.');
    const users = await this.prismaService.account.findMany();

    return {
      allUsers: [1, 2, 3],
    };
  }

  async edit(): Promise<any> {
    return {
      success: true,
    };
  }
}

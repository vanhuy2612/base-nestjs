import { Injectable } from '@nestjs/common';
import { BaseListener } from '../base/base.listener';
import { EVENT_NAMES } from '../common';
import { OnEvent } from '@nestjs/event-emitter';
import UserLoginEvent from '../model/UserLoginEvent';

/**
 * Must be wrapped by try..catch..
 * if error is appreared, app will be crashed.
 */
@Injectable()
export class UserListener extends BaseListener {
  @OnEvent(EVENT_NAMES.USER_LOGIN)
  async handle(event: UserLoginEvent) {
    try {
      this.logger.log('User is logining ...', event.username);
      const users = await this.prismaService.account.findMany();
      this.logger.log('From Event Emmiter, ', users.length);
    } catch (e) {
      this.logger.error(`%s is fail.`, EVENT_NAMES.USER_LOGIN);
    }
  }
}

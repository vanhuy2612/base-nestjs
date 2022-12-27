import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async healCheck(): Promise<string> {
    try {
      const res = await this.userService.healCheck();
      return res;
    } catch (e) {
      console.log(e);
      return "403"
    }
  }
}

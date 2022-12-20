import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async healCheck(): Promise<string> {
    try {
      const res = await this.appService.healCheck();
      return res;
    } catch (e) {
      console.log(e);
      return "403"
    }
  }
}

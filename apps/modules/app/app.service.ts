import { Injectable } from '@nestjs/common';
import UserModel from '@root/apps/models/UseModel';

@Injectable()
export class AppService {
  async healCheck(): Promise<string> {
    const users = await UserModel.getByName("huy");
    return 'Hello World!';
  }
}

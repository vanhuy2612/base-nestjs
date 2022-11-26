import { Injectable } from '@nestjs/common';
import UserModel from '@root/apps/models/UseModel';

@Injectable()
export class AppService {
  async healCheck(): Promise<any> {
    const users = await UserModel.getByName("huy");
    return users;
  }
}

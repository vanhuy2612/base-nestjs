import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/apps/modules/app.module';
import Env from './Env';

class Server {
  async start() {
    const app = await NestFactory.create(AppModule);
    const port = Env.get('PORT', 3000);
    await app.listen(port);
    console.log('Server is running on port :', port);
  }
}

export default Server;

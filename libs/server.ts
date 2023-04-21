import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/apps/modules/app.module';
import Env from './Env';
import { KafkaMicroservice } from '@root/apps/kafka/index.service';
import { RedisMicroservice } from '@root/libs/core/redis';
import { CustomExceptionFilter } from './core/exception/CustomExceptionFilter';

class Server {
  async start() {
    const port = Env.get('PORT', 3333);
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new CustomExceptionFilter());
    // if (Env.get('KAFKA_STATUS', '0') === '1') {
    //   const kafka = new KafkaMicroservice(app);
    //   kafka.connect();
    // }
    if (Env.get('REDIS_STATUS', '0') === '1') {
      const redis = new RedisMicroservice(app);
      redis.connect();
    }
    app.listen(port);
    console.log('Server is running on port :', port);
  }
}

export default Server;

import {NestFactory} from '@nestjs/core';
import {AppModule} from '@modules/app/app.module';
import Env from './Env';
import BaseModel from '@root/apps/models/BaseModel';

class Server {
    async start() {
        const app = await NestFactory.create(AppModule);
        const port = Env.get('PORT') || 3000;
        await app.listen(port);
        BaseModel.connect();
        console.log("Server is running on port :", port);
    }
}

export default Server;



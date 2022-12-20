import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseQueue  {
    readonly name: string;
    async handle() {}
    async start() {
        this.handle();
    }
}
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import Env from '@root/libs/Env';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from './common';
import { LoggerService } from '@root/libs/core/logger/index.service';

const port: number = parseInt(Env.get('WEBSOCKET_PORT', 80));
@WebSocketGateway(port, {
    cors: {
        origin: '*',
    },
})
@Injectable()
export class SocketIOGateway implements OnModuleInit {
    constructor(
        readonly logger: LoggerService
    ) { }

    async onModuleInit() {
        this.logger.log('************ SocketIOGateway is running at', port);
    }

    afterInit(server: Server) {
        this.logger.log('************ SocketIOGateway is running at', port);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected: ${client.id}`, args);
        client.join('room_name');
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage(SOCKET_EVENT.USER_CONNECTED)
    loggedIn(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ) {
        this.logger.log("User logged in ", data);
    }

    @SubscribeMessage('events')
    findAll(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ) {
        this.logger.log("Socket", client.id, data);
        this.server.emit('RESPONSE_EVENT', { data: 123 });
        this.server.to('room_name').emit('RESPONSE_EVENT', { data: 456 });
        return;
    }
}
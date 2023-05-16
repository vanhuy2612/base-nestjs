import { OnModuleInit } from '@nestjs/common';
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

const port = Env.get('WEBSOCKET_PORT', 80);
@WebSocketGateway(80, {
    cors: {
        origin: '*',
    },
})
export class SocketIOGateway implements OnModuleInit {
    async onModuleInit() {
        console.log('************ SocketIOGateway is running at', port);
    }

    afterInit(server: Server) {
        console.log('************ SocketIOGateway is running at', port);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client Connected: ${client.id}`, args);
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage(SOCKET_EVENT.USER_CONNECTED)
    loggedIn(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ) {
        console.log("User logged in ", data);
    }

    @SubscribeMessage('events')
    findAll(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ) {
        console.log("Socket", client.id, data);
        this.server.emit('RESPONSE_EVENT', { data: 123 });
        return;
    }
}
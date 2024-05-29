import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "tls";
import { Socket } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";
import axios from "axios";
import { RoomsService } from "src/rooms/rooms.service";
import { IPlayer } from "src/types/Player";

interface IUser {
    username: string
    team: string
}

const users: Array<IUser> = []

@WebSocketGateway(9001)
export default class MultiplayerGateway {

    @WebSocketServer()
    server: Server

    constructor(
        private readonly db: PrismaService,
        private readonly roomService: RoomsService) { }

    handleConnection(client: Socket) {
        users.push({
            username: client.handshake.query.username as string,
            team: client.handshake.query.team as string
        });
    }

    @SubscribeMessage("player_transform")
    async onPlayerTransformUpdate(
        @ConnectedSocket() socket: Socket,
        @MessageBody() playerTransform: string) {
        socket.broadcast.emit("other_players_transform", playerTransform);
    }

    @SubscribeMessage("bullet_transfrom")
    async onBulletTransformUpdate(
        @ConnectedSocket() socket: Socket,
        @MessageBody() bulletTransform: string) {
        console.log(bulletTransform);
        socket.broadcast.emit("other_bullet_transform", bulletTransform);
    }

    @SubscribeMessage("player_join")
    async onPlayerJoined(@MessageBody() playerJoined: string) {
        console.log("Emitting...", playerJoined);
        this.server.emit("client_player_join", playerJoined);
    }
} ``
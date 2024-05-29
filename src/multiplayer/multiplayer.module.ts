import { Module } from "@nestjs/common";
import MultiplayerService from "./multiplayer.service";
import MultiplayerGateway from "./multiplayer.gateway";
import { RoomsService } from "src/rooms/rooms.service";

@Module({
    providers: [
        MultiplayerService,
        MultiplayerGateway,
        RoomsService
    ]
})
export default class MultiplayerModule { }
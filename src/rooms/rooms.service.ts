import { Injectable } from '@nestjs/common';
import { io } from 'socket.io-client';
import MultiplayerGateway from 'src/multiplayer/multiplayer.gateway';
import { IPlayer } from 'src/types/Player';

const socket = io("http://localhost:7000");

const players: Array<IPlayer> = [];

@Injectable()
export class RoomsService {

    getPlayers(): Array<IPlayer> {
        return players;
    }

    isPlayerAlreadyJoined(player: IPlayer) {
        for (let i = 0; i < this.getPlayers().length; i++) {
            if (this.getPlayers()[i].username === player.username) {
                return true;
            }
        }

        return false;
    }

    joinRoom(player: IPlayer) {
        if (this.isPlayerAlreadyJoined(player)) return;

        this.getPlayers().push(player);

        const playerJSON = `
        {
            "username": "${player.username}",
            "team": "${player.team}",
            "room": " ${player.room}",
        }
        `;
        console.log(playerJSON);

        socket.emit("player_join", playerJSON);
    }

    getRoomPlayers(room: string) {
        return this.getPlayers().filter((player: IPlayer) => player.room === room);
    }

}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { IPlayer } from 'src/types/Player';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  joinRoom(@Body() player: IPlayer) {
    return this.roomsService.joinRoom(player);
  }

  @Get(':room')
  getRoomPlayers(@Param('room') room: string) {
    return this.roomsService.getRoomPlayers(room);
  }

}

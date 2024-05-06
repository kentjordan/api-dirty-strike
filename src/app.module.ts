import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, PrismaModule, JwtModule.register({
    secret: "TOP_SECRET_KEY",
    global: true
  })],
})
export class AppModule { }

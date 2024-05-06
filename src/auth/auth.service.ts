import { BadRequestException, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly db: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async login(credentials: LoginDto) {

        const player = await this.db.player.findUniqueOrThrow({
            select: {
                username: true,
                password: true
            },
            where: {
                username: credentials.username
            }
        });

        const isPwdVerified = await argon.verify(player.password, credentials.password)

        if (isPwdVerified) {

            const access_token = this.jwt.sign({ username: player.username }, { secret: "TOP_SECRET_KET" })
            const refresh_token = this.jwt.sign({ access_token }, { secret: "TOP_SECRET_KET" });

            return {
                access_token,
                refresh_token
            }
        }

        throw new BadRequestException("Invalid Password")

    }

    async signup(credentials: SignupDto) {
        const hashedPwd = await argon.hash(credentials.password);

        await this.db.player.create({
            data: {
                username: credentials.username,
                password: hashedPwd
            }
        })
    }
}

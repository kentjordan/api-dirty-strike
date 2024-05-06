import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import PrismaFilter from 'src/filters/Prisma.filter';

@UseFilters(PrismaFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('signup')
  signup(@Body() credentials: SignupDto) {
    return this.authService.signup(credentials);
  }

}

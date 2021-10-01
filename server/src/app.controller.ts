import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { IpAddress } from './lib/IpAddress';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Request() req, @IpAddress() ipAddress) {
    try {
      return await this.usersService.create({ ...req.body, ip: ipAddress });
    } catch (error) {
      if (error && error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'This username is already registered.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Oops! Something bad happened. Call Support.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

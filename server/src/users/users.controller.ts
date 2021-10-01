import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IpAddress } from 'src/lib/IpAddress';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() param): Promise<User> {
    return this.userService.findOne(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @IpAddress() ipAddress,
  ): Promise<User> {
    try {
      return await this.userService.create({ ...createUserDto, ip: ipAddress });
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
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.userService.remove(id);
    return 'User successfully removed.';
  }
}

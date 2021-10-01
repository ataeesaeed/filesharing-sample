import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FilesModule } from 'src/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, FilesModule],
})
export class UsersModule {}

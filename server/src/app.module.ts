import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files/files.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { FilesService } from './files/files.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, FilesModule, AuthModule],
  controllers: [AppController, FilesController, UsersController],
  providers: [AppService, UsersService, FilesService],
})
export class AppModule {}

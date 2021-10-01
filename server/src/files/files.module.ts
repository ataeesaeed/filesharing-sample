import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FileSubscriber } from './file.subscriber';

@Module({
  imports: [
    MulterModule.register({
      dest: '/uploads',
    }),
    TypeOrmModule.forFeature([File]),
  ],
  exports: [TypeOrmModule, FilesService],
  controllers: [FilesController],
  providers: [FilesService, FileSubscriber],
})
export class FilesModule {}

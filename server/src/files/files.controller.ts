import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  Req,
  HttpStatus,
  HttpException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, editFileName } from './file.helper';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { File } from './interfaces/file.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/user.decorator';
import { promises as fs } from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') imageId: string) {
    const fileData = await this.filesService.findOne(imageId);
    if (fileData) {
      return fileData;
    } else {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/download')
  async downloadFile(@Param('id') imageId: string, @Res() res) {
    const fileData = await this.filesService.findOne(imageId);
    if (fileData) {
      // we can also listen to client's api call to update the file
      // but i did it here. because client can ban the update request.
      await this.filesService.update(`${fileData.id}`);
      return res.sendFile(fileData.path, { root: './' });
    } else {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@AuthUser() user: any): Promise<File[]> {
    return this.filesService.findAllUserFiles(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // TODO hardcoded, move to config
      fileFilter,
    }),
  )
  uploadSingle(
    @UploadedFile() file,
    @Req() request,
    @AuthUser() user: any,
  ): Promise<File> {
    if (request.fileError) {
      throw new HttpException(request.fileError, HttpStatus.BAD_REQUEST);
    }
    return this.filesService.create({ ...file, userId: user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string): Promise<string> {
    return this.filesService.update(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @AuthUser() user: any,
  ): Promise<string> {
    const fileData = await this.filesService.remove(id, user.userId);
    if (!fileData) return 'No file found with this id';
    removeFile(fileData.path);
    return 'File successfully removed';
  }
}

async function removeFile(path) {
  try {
    await fs.unlink(path);
  } catch (error) {
    console.log('An error occurred while removing the file', error);
  }
}

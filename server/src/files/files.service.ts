import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  create(newFile: any): Promise<File> {
    const file = new File();
    file.name = newFile.originalname;
    file.path = newFile.path;
    file.size = newFile.size;
    file.type = newFile.mimetype;
    file.userId = newFile.userId;
    file.downloads = 0;
    file.createdAt = new Date();

    return this.filesRepository.save(file);
  }

  findAll(): Promise<File[]> {
    return this.filesRepository.find();
  }

  findAllUserFiles(userId: string): Promise<File[]> {
    return this.filesRepository.find({ where: { userId } });
  }

  findOne(id: string): Promise<File> {
    return this.filesRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<File> {
    // a user can remove just his files
    const data = await this.filesRepository.find({ where: { userId, id } });
    if (!data.length) return;
    await this.filesRepository.delete(data[0].id);
    return data[0];
  }

  async update(id: string): Promise<string> {
    const res = await this.filesRepository.increment(
      { id: +id },
      'downloads',
      1,
    );
    if (!res.affected) return 'no file found with this id';
    return 'record updated.';
  }
}

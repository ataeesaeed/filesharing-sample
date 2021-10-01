import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userData: any): Promise<User> {
    const user = new User();
    user.username = userData.username;
    user.password = userData.password;
    user.ip = userData.ip;
    user.createdAt = new Date();

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByUsername(username: string): Promise<User[]> {
    return this.usersRepository.find({ where: { username } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, createUserDto: any): Promise<string> {
    const res = await this.usersRepository.update(
      { id: +id },
      {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    );
    if (!res.affected) return 'no user found with this id';
    return 'record updated.';
  }
}

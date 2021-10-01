import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { File } from '../files/file.entity';

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  ip: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => File, (file) => file.userId)
  files: File[];
}

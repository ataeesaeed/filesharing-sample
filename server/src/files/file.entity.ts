import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsInt,
  IsMimeType,
  IsNotIn,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  path: string;

  @Column()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @Column()
  @IsInt()
  @Min(10)
  @Max(10 * 1024 * 1024)
  size: number;

  @Column()
  @IsString()
  @IsMimeType()
  @IsNotIn([
    'text/vnd.trolltech.linguist',
    'text/javascript',
    'image/bmp',
    'application/x-ms-dos-executable',
  ])
  type: string;

  @Column()
  @IsInt()
  userId: string;

  @Column()
  @IsInt()
  downloads: number;

  @Column()
  @IsDate()
  createdAt: Date;
}

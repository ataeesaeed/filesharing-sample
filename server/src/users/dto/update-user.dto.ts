import { IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  //Minimum eight characters, at least one letter and one number:
  @Matches('^[a-zA-Z0-9]{8,}$')
  readonly password: string;
}

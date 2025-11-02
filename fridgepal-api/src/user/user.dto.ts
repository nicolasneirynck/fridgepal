import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;
}
//passwordHash?

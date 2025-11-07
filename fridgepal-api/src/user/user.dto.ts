import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserListResponseDto {
  items: PublicUserResponseDto[];
}

export class PublicUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  country: string;

  @Expose()
  email: string;
}

export class UpdateUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  country: string;

  @IsString()
  @IsEmail()
  email: string;
}

export class RegisterUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  country: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

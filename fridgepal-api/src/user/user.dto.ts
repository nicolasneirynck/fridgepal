import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'nestjs-swagger-dto';

export class UserListResponseDto {
  @ApiProperty({
    type: () => [PublicUserResponseDto],
    description: 'List of users returned by the API.',
  })
  items: PublicUserResponseDto[];
}

export class PublicUserResponseDto {
  @ApiProperty({
    example: 12,
    description: 'Unique identifier of the user.',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Nicolas',
    description: 'First name of the user.',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    example: 'Neirynck',
    description: 'Last name of the user.',
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    example: 'nicolas@example.com',
    description: 'Email address of the user.',
  })
  @Expose()
  email: string;
}

export class UpdateUserRequestDto {
  @IsString({ minLength: 2, maxLength: 255 })
  firstName: string;

  @IsString({ minLength: 2, maxLength: 255 })
  lastName: string;

  @IsString({ minLength: 2, maxLength: 255 })
  email: string;
}

export class RegisterUserRequestDto {
  @IsString({ minLength: 2, maxLength: 255 })
  firstName: string;

  @IsString({ minLength: 2, maxLength: 255 })
  lastName: string;

  @IsString({ minLength: 2, maxLength: 255 })
  email: string;

  @IsString({ minLength: 8, maxLength: 128 })
  password: string;
}

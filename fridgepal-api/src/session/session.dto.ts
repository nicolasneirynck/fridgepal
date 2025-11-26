import { IsString } from 'nestjs-swagger-dto';

export class LoginRequestDto {
  @IsString({ minLength: 2, maxLength: 255 })
  email: string;

  @IsString({ minLength: 2, maxLength: 255 })
  password: string;
}

export class LoginResponseDto {
  token: string;
}

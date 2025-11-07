import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { UserService } from './user.service';
import { RecipeShortResponseDto } from '../recipe/recipe.dto';
import {
  PublicUserResponseDto,
  UserListResponseDto,
  UpdateUserRequestDto,
  RegisterUserRequestDto,
} from './user.dto';
import { LoginResponseDto } from '../session/session.dto';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles';

@Controller('users')
export class UserController {
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PublicUserResponseDto> {
    return this.userService.getById(id);
  }

  @Get('/:id/favoriterecipes')
  async getFavoritePlaces(
    @Param('id') id: string,
  ): Promise<RecipeShortResponseDto[]> {
    return await this.recipeService.getFavoriteRecipesByUserId(Number(id));
  }

  @Post()
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return this.userService.updateById(id, updateUserRequestDto);
  }
}

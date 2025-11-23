import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Post,
  UseGuards,
  Delete,
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
import { CheckUserAccessGuard } from '../auth/guards/userAccess.guard';
import { type Session } from '../types/auth';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { ParseUserIdPipe } from '../auth/pipes/parseUserId.pipe';
import { Public } from '../auth/decorators/public.decorator';

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
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<PublicUserResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return this.userService.getById(userId);
  }

  @Public()
  @Post()
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @Put(':id')
  @UseGuards(CheckUserAccessGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: 'me' | number,
    @CurrentUser() user: Session,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return await this.userService.updateById(
      id === 'me' ? user.id : id,
      updateUserRequestDto,
    );
  }

  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  async deleteUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    return await this.userService.deleteById(id === 'me' ? user.id : id);
  }

  @Get('/:id/favoriterecipes')
  @UseGuards(CheckUserAccessGuard)
  async getFavoritePlaces(
    @Param('id', ParseUserIdPipe) id: number | 'me',
    @CurrentUser() user: Session,
  ): Promise<RecipeShortResponseDto[]> {
    return await this.recipeService.getFavoriteRecipesByUserId(
      id === 'me' ? user.id : id,
    );
  }
}

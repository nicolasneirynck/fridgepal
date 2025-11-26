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
import {
  RecipeShortResponseDto,
  RecipeListResponseDto,
} from '../recipe/recipe.dto';
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
import { ApiTags, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: UserListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: PublicUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: "User ID of 'me' voor huidige user",
    schema: {
      oneOf: [
        { type: 'string', example: 'me' },
        { type: 'integer', example: 12 },
      ],
    },
  })
  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<PublicUserResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return this.userService.getById(userId);
  }

  @ApiResponse({
    status: 201,
    description: 'Register user',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Public()
  @Post()
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @ApiResponse({
    status: 200,
    description: 'edit user',
    type: PublicUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: "User ID of 'me' voor huidige user",
    schema: {
      oneOf: [
        { type: 'string', example: 'me' },
        { type: 'integer', example: 12 },
      ],
    },
  })
  @Put(':id')
  @UseGuards(CheckUserAccessGuard)
  async updateUser(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return await this.userService.updateById(
      id === 'me' ? user.id : id,
      updateUserRequestDto,
    );
  }

  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: "User ID of 'me' voor huidige user",
    schema: {
      oneOf: [
        { type: 'string', example: 'me' },
        { type: 'integer', example: 12 },
      ],
    },
  })
  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  async deleteUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    return await this.userService.deleteById(id === 'me' ? user.id : id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all favorite recipes of user',
    type: RecipeListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: "User ID of 'me' voor huidige user",
    schema: {
      oneOf: [
        { type: 'string', example: 'me' },
        { type: 'integer', example: 12 },
      ],
    },
  })
  @Get('/:id/favoriterecipes')
  @UseGuards(CheckUserAccessGuard)
  async getFavoritePlaces(
    @Param('id', ParseUserIdPipe) id: number | 'me',
    @CurrentUser() user: Session,
  ): Promise<RecipeListResponseDto> {
    return await this.recipeService.getFavoriteRecipesByUserId(
      id === 'me' ? user.id : id,
    );
  }

  //TODO -> ('/:id/recipes') -> eigen geuploade recepten
}

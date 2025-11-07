import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RecipeModule } from '../recipe/recipe.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';

@Module({
  imports: [DrizzleModule, RecipeModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

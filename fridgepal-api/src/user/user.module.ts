import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RecipeModule } from '../recipe/recipe.module';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule, RecipeModule],
  controllers: [UserController],
  // providers: [UserService],
  // exports: [UserService],
})
export class UserModule {}

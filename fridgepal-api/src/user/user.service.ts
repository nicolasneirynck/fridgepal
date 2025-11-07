// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PublicUserResponseDto,
  UserListResponseDto,
  UpdateUserRequestDto,
} from './user.dto';
import { plainToInstance } from 'class-transformer';
import { InjectDrizzle } from '../drizzle/drizzle.provider';
import type { DatabaseProvider } from '../drizzle/drizzle.provider';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<UserListResponseDto> {
    const usersList = await this.db.query.users.findMany();
    const items = usersList.map((user) =>
      plainToInstance(PublicUserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
    return { items };
  }

  async getById(id: number): Promise<PublicUserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      throw new NotFoundException('No user with this id exists');
    }

    return plainToInstance(PublicUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateById(
    id: number,
    changes: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    const [result] = await this.db
      .update(users)
      .set(changes)
      .where(eq(users.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No user with this id exists');
    }

    return this.getById(id);
  }
}

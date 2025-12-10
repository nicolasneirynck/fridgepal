import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { users } from '../../src/drizzle/schema';
import { Role } from '../../src/auth/roles';
import { sql } from 'drizzle-orm';

export async function seedUsers(
  app: INestApplication,
  drizzle: DatabaseProvider,
) {
  const authService = app.get(AuthService);
  const passwordHash = await authService.hashPassword('12345678');

  await drizzle.insert(users).values([
    {
      id: 1,
      email: 'test.user@hogent.be',
      firstName: 'Normal',
      lastName: 'Tester',
      passwordHash,
      roles: [Role.USER],
    },
    {
      id: 2,
      email: 'admin.user@hogent.be',
      firstName: 'Admin',
      lastName: 'Tester',
      passwordHash,
      roles: [Role.ADMIN, Role.USER],
    },
  ]);
}

// export async function clearUsers(drizzle: DatabaseProvider) {
//   await drizzle.delete(users);
// }

export async function clearUsers(drizzle: DatabaseProvider) {
  await drizzle.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
  await drizzle.execute(sql`TRUNCATE TABLE users`);
  await drizzle.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
}

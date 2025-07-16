import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create role
  const role = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role with full access',
    },
  });

  // Create user
  const user = await prisma.appUser.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      firstname: 'Test',
      lastname: 'User',
      password: 'testpassword',
      email: 'test@example.com',
      nonlocked: true,
      enabled: true,
      last_time_password_updated: new Date('1970-01-01T00:00:00Z'),
      password_never_expires: false,
      cannot_change_password: false,
    },
  });

  // Assign role to user via AppUserRole join table
  await prisma.appUserRole.create({
    data: {
      appuser_id: user.id,
      role_id: role.id,
    },
  });
  
  await prisma.userPhone.createMany({
    data: [
      {
        appuser_id: user.id,
        phone_country_id: 254,
        phone: '712345678',
        order_index: 1,
      },
      {
        appuser_id: user.id,
        phone_country_id: 1,
        phone: '5551234567',
        order_index: 2,
      },
    ],
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());


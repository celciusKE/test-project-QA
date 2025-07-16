import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchUserData() {
  const users = await prisma.appUser.findMany({
    include: {
      roles: { include: { Role: true } },
      userPhones: true,
    },
  });

  return users.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    name: `${u.firstname} ${u.lastname}`,
    enabled: u.enabled,
    roles: u.roles.map((r) => r.Role.name),
    phones: u.userPhones.map((p) => p.phone),
  }));
}


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS_COUNT = 100;
const POSTS_PER_USER = 10;

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const usersPayload = Array.from({ length: USERS_COUNT }, (_, index) => ({
    email: `user${index + 1}@demo.dev`,
    name: `User ${index + 1}`,
  }));

  await prisma.user.createMany({
    data: usersPayload,
  });

  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: { id: true, name: true },
  });

  const postsPayload = users.flatMap((user) =>
    Array.from({ length: POSTS_PER_USER }, (_, index) => ({
      userId: user.id,
      title: `${user.name} - Post ${index + 1}`,
      content: `Sample content for ${user.name}, post ${index + 1}.`,
    })),
  );

  await prisma.post.createMany({
    data: postsPayload,
  });

  console.info(
    `Seed completed: ${users.length} users and ${postsPayload.length} posts inserted.`,
  );
}

void main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

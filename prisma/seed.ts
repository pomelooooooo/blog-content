import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await prisma.admin.upsert({
    where: { email: 'suwijak@gmail.com' },
    update: {},
    create: {
      email: 'suwijak@gmail.com',
      password: hashedPassword,
      name: 'Suwijak',
    },
  });

  const tech = await prisma.category.upsert({
    where: { slug: 'technology' },
    update: {},
    create: { name: 'Technology', slug: 'technology' },
  });

  const lifestyle = await prisma.category.upsert({
    where: { slug: 'lifestyle' },
    update: {},
    create: { name: 'Lifestyle', slug: 'lifestyle' },
  });

  const nestjsTag = await prisma.tag.upsert({
    where: { slug: 'nestjs' },
    update: {},
    create: { name: 'NestJS', slug: 'nestjs' },
  });

  const typescriptTag = await prisma.tag.upsert({
    where: { slug: 'typescript' },
    update: {},
    create: { name: 'TypeScript', slug: 'typescript' },
  });

  const dockerTag = await prisma.tag.upsert({
    where: { slug: 'docker' },
    update: {},
    create: { name: 'Docker', slug: 'docker' },
  });

  await prisma.post.upsert({
    where: { slug: 'getting-started-with-nestjs' },
    update: {},
    create: {
      title: 'Getting Started with NestJS',
      slug: 'getting-started-with-nestjs',
      content:
        'NestJS is a progressive Node.js framework for building efficient server-side applications.',
      excerpt: 'Learn the basics of NestJS framework.',
      published: true,
      categoryId: tech.id,
      tags: {
        create: [{ tagId: nestjsTag.id }, { tagId: typescriptTag.id }],
      },
    },
  });

  await prisma.post.upsert({
    where: { slug: 'docker-for-developers' },
    update: {},
    create: {
      title: 'Docker for Developers',
      slug: 'docker-for-developers',
      content:
        'Docker simplifies development by packaging applications into containers.',
      excerpt: 'A quick guide to Docker.',
      published: true,
      categoryId: tech.id,
      tags: {
        create: [{ tagId: dockerTag.id }],
      },
    },
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

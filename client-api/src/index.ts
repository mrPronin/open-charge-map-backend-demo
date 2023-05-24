import 'reflect-metadata';
import { container } from '@presentation/ioc_container.js';
import { bootstrap } from '@presentation/bootstrap.js';
import { PrismaClient } from '@prisma/client';
import { referenceIoCData } from '@/inversify.config';

const prisma = new PrismaClient();

async function main() {
  const port =
    (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4001;
  await bootstrap(container, port, referenceIoCData);
}

main()
  // eslint-disable-next-line promise/always-return
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('failed starting server', error);
    await prisma.$disconnect();
  });

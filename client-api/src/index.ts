import 'reflect-metadata';
import { container } from '@presentation/ioc_container.js';
import { bootstrap } from '@presentation/bootstrap.js';
import { referenceIoCData } from '@/inversify.config';
// debug
// eslint-disable-next-line import/order
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// debug

async function main() {
  const port =
    (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4001;
  const { MONGODB_URI, MONGO_DB } = process.env;
  await bootstrap(container, port, MONGODB_URI, MONGO_DB, referenceIoCData);

  const firstTenPOI = await prisma.pois.findMany({ take: 10 });
  console.log(firstTenPOI);
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

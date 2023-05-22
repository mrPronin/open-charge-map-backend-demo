import 'reflect-metadata';
import { container } from '@presentation/ioc_container.js';
import { referenceIoCData } from '@/inversify.config';
import { bootstrap } from '@presentation/bootstrap.js';

async function main() {
  const port =
    (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4001;
  const { MONGODB_URI, MONGO_DB } = process.env;
  await bootstrap(
    container,
    port,
    MONGODB_URI,
    MONGO_DB,
    referenceIoCData
  );
}

main().catch((error) => console.error('failed starting server', error));

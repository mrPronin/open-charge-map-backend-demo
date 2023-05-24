import 'reflect-metadata';
import { container } from '@presentation/ioc_container.js';
import { bootstrap } from '@presentation/bootstrap.js';
import { referenceIoCData } from '@/inversify.config';

async function main() {
  const port =
    (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4000;
  const { MONGODB_URI, MONGO_DB, BASE_OCM_URL, OCM_API_KEY } = process.env;
  await bootstrap(
    container,
    port,
    MONGODB_URI,
    MONGO_DB,
    BASE_OCM_URL,
    OCM_API_KEY,
    referenceIoCData
  );
}

main().catch((error) => console.error('failed starting server', error));

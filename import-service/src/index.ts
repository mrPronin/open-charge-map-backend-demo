import { bootstrap } from '@presentation/bootstrap.js';

async function main() {
  const port =
    (process.env.PORT && Number.parseInt(process.env.PORT, 10)) || 4000;
  const { MONGODB_URI, MONGO_DB } = process.env;
  await bootstrap(port, MONGODB_URI, MONGO_DB);
}

main().catch((error) => console.error('failed starting server', error));

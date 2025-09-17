import initMongoDB from './db/initMongoDB.js';
import { createServer } from './server.js';

const main = async () => {
  await initMongoDB();
  createServer();
};

main();

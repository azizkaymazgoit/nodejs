import initMongoDB from './db/initMongoDB.js';
import { createServer } from './server.js';

const main = async () => {
  await initMongoDB();
  createServer();
};

main();


// aziz22 - teacher - 68e6c8b602acebd663152bab

// aziz23 - parent - 68e6c8fde983c2bde1e900c1

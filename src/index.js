import { TEMP_FOLDER, UPLOADS_FOLDER } from './constants/index.js';
import initMongoDB from './db/initMongoDB.js';
import { createServer } from './server.js';

import { createFileIfNotExist } from './utils/createFileIfNotExist.js';

const main = async () => {
  await initMongoDB();
  await createFileIfNotExist(TEMP_FOLDER);
  await createFileIfNotExist(UPLOADS_FOLDER);
  createServer();
};

main();

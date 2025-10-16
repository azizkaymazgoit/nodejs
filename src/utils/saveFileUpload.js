import fs from 'node:fs/promises';
import path from 'node:path';

import { TEMP_FOLDER, UPLOADS_FOLDER } from '../constants/index.js';

export const saveFileUpload = async (file) => {
  await fs.rename(
    path.join(TEMP_FOLDER, file.filename),
    path.join(UPLOADS_FOLDER, file.filename),
  );

  return `${process.env.APP_DOMAIN}/uploads/${file.filename}`;
};

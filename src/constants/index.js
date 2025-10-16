import path from 'node:path';

export const ACCESS_TOKEN_TIME = 15 * 60 * 1000;
export const REFRESH_TOKEN_TIME = 24 * 60 * 60 * 1000;

export const USER_ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const TEMP_FOLDER = path.join(process.cwd(), 'temp');
export const UPLOADS_FOLDER = path.join(process.cwd(), 'uploads');
